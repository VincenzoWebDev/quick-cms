<?php

namespace App\Http\Controllers\Front;

use App\Http\Requests\CheckoutRequest;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\ShippingAddress;
use App\Models\ShippingMethod;
use App\Models\User;
use App\Models\VariantCombinationValue;
use App\Notifications\NewOrderNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutController extends \App\Http\Controllers\Controller
{
    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)
            ->with('product', 'VariantCombination.variantCombinationValues.productVariantValue')
            ->get();

        if ($cartItems->isEmpty()) {
            return;
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
                'color' => $cartItem->color,
                'size' => $cartItem->size,
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
            $admin = User::where('role', 'admin')->first();
            $admin->notify(new NewOrderNotification($order));
        }

        return redirect()->route('checkout.payment', ['orderId' => $order->id]);
    }

    public function payment(Request $request)
    {
        return Inertia::render('Front/Themes/' . $this->themeName . '/Payment', [
            'orderId' => $request->orderId
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
