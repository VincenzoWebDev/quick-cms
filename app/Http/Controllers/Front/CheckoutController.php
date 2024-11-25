<?php

namespace App\Http\Controllers\Front;

use App\Http\Requests\CheckoutRequest;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\ShippingAddress;
use App\Models\ShippingMethod;
use App\Models\User;
use App\Notifications\NewOrderNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Shippo;
use App\Services\ShippoService;

class CheckoutController extends \App\Http\Controllers\Controller
{
    protected $themeName;
    protected $shippoService;

    public function __construct(ShippoService $shippoService)
    {
        $this->themeName = $this->getActiveTheme();
        Shippo::setApiKey(env('SHIPPO_API_KEY'));
        $this->shippoService = $shippoService;
    }

    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)
            ->with('product', 'VariantCombination.variantCombinationValues.productVariantValue')
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('home');
        } else {
            $shippingMethods = ShippingMethod::all();
            return Inertia::render('Front/Themes/' . $this->themeName . '/Checkout', [
                'cartItems' => $cartItems,
                'shippingMethods' => $shippingMethods,
            ]);
        }
    }

    public function store(CheckoutRequest $request)
    {
        $order = new Order();
        $order->user_id = auth()->id();
        $order->phone_number = $request->phone;
        $order->total = $request->total_price;
        $order->shipping_method_id = $request->shipping_method_id;
        $res = $order->save();

        $cartItems = CartItem::where('user_id', auth()->id())->get();
        foreach ($cartItems as $cartItem) {
            $order->orderItems()->create([
                'order_id' => $order->id,
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->product->price * $cartItem->quantity,
                'combination_id' => $cartItem->combination_id,
            ]);
        }
        $shippingAddress = new ShippingAddress();
        $shippingAddress->order_id = $order->id;
        $shippingAddress->address = $request->address;
        $shippingAddress->civic = $request->civic;
        $shippingAddress->province = $request->province;
        $shippingAddress->postal_code = $request->cap;
        $shippingAddress->city = $request->city;
        $res = $shippingAddress->save();

        if ($res) {
            // Crea la spedizione con Shippo
            $fromAddress = [
                'object_purpose' => 'PURCHASE',
                'name' => 'Shawn Ippotle',
                'company' => 'Shippo',
                'street1' => '215 Clayton St.',
                'city' => 'San Francisco',
                'state' => 'CA',
                'zip' => '94117',
                'country' => 'US',
                'phone' => '+1 555 341 9393',
                'email' => 'shippotle@goshippo.com'
            ];

            $toAddress = [
                'object_purpose' => 'PURCHASE',
                'name' => $request->name,
                'street1' => $request->address,
                'street2' => $request->civic,
                'city' => $request->province,
                // 'state' => $request->province,
                'zip' => $request->cap,
                'state' => $request->city,
                'country' => 'US',
                'phone' => $request->phone,
                'email' => auth()->user()->email,
            ];

            $parcel = [
                'length' => 10,
                'width' => 10,
                'height' => 10,
                'weight' => 1,
                'distance_unit' => 'in',
                'mass_unit' => 'lb',
            ];

            // Crea la spedizione
            $shipment = $this->shippoService->createShipment($fromAddress, $toAddress, $parcel);
            // Controlla se la spedizione è stata creata correttamente
            if (!$shipment || !isset($shipment)) {
                return response()->json(['error' => 'Failed to create shipment'], 400);
            }

            // Ottieni le tariffe
            $rates = $this->shippoService->getRates($shipment);

            // Controlla se ci sono tariffe disponibili
            if (empty($rates) || !isset($rates[0])) {
                return response()->json(['error' => 'No shipping rates found'], 400);
            }

            // Crea la transazione (etichetta)
            $transaction = $this->shippoService->createTransaction($rates[0]);
            // Controlla se la transazione è stata creata con successo
            if (!$transaction || !isset($transaction['tracking_number'])) {
                return response()->json(['error' => 'Failed to create transaction'], 400);
            }

            // Ottieni il numero di tracciamento
            $trackingNumber = $transaction['tracking_number'];

            // Aggiorna l'ordine con il numero di tracciamento
            $order->tracking_number = $trackingNumber;
            $order->shipping_status = $transaction['tracking_status'] ?? 'pending';
            $order->save();

            // Notifica l'amministratore
            $admin = User::where('role', 'admin')->first();
            $admin->notify(new NewOrderNotification($order));
        }

        return redirect()->route('checkout.payment', $order->id);
    }

    public function payment($id)
    {
        $order = Order::find($id);
        if (!$order || $order->payment_status == 'paid') {
            abort(404);
        }
        return Inertia::render('Front/Themes/' . $this->themeName . '/Payment', [
            'orderId' => $id
        ]);
    }

    public function PaymentSuccess(Request $request)
    {
        $order = Order::find($request->orderId);
        $order->payment_status = 'paid';
        $res = $order->save();

        if ($order->payment_status == 'paid') {
            $cartItems = CartItem::where('user_id', auth()->id())->get();
            foreach ($cartItems as $cartItem) {
                $cartItem->delete();
            }
            foreach ($order->orderItems as $orderItem) {
                $product = Product::find($orderItem->product_id);
                $product->stock = $product->stock - $orderItem->quantity;
                $product->save();
            }
            foreach ($order->orderItems as $orderItem) {
                $combinations = $orderItem->product->combinations;
                $combination = $combinations->where('id', $orderItem->combination_id)->first();
                $combination->quantity = $combination->quantity - $orderItem->quantity;
                $combination->save();
            }
        }

        $messaggio = $res ? 'Pagamento andato a buon fine' : 'Pagamento non andato a buon fine';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('productList');
    }
}
