<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\OrderFilterRequest;
use App\Models\Order;
use App\Models\ShippingAddress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends \App\Http\Controllers\Controller
{
    public function index(OrderFilterRequest $request)
    {
        // Parametri di sorting e paginazione
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $perPage = $request->input('perPage', 10);
        $searchQuery = $request->input('q', '');

        // Query sugli ordini
        $orders = Order::with('shippingMethod', 'orderItems.product', 'user')
            ->orderBy($sortBy, $sortDirection)
            ->when($searchQuery, function ($query) use ($searchQuery) {
                $query->where(function ($query) use ($searchQuery) {
                    $query->where('id', 'like', '%' . $searchQuery . '%')
                        ->orWhere('shipping_status', 'like', '%' . $searchQuery . '%')
                        ->orWhere('payment_status', 'like', '%' . $searchQuery . '%')
                        ->orWhere('total', 'like', '%' . $searchQuery . '%')
                        ->orWhere('created_at', 'like', '%' . $searchQuery . '%')
                        ->orWhereHas('user', function ($query) use ($searchQuery) {
                            $query->where('name', 'like', '%' . $searchQuery . '%')
                                ->orWhere('email', 'like', '%' . $searchQuery . '%');
                        })
                        ->orWhereHas('shippingMethod', function ($query) use ($searchQuery) {
                            $query->where('name', 'like', '%' . $searchQuery . '%');
                        })
                        ->orWhereHas('orderItems.product', function ($query) use ($searchQuery) {
                            $query->where('name', 'like', '%' . $searchQuery . '%');
                        })
                        ->orWhereHas('shippingAddress', function ($query) use ($searchQuery) {
                            $query->where('address', 'like', '%' . $searchQuery . '%')
                                ->orWhere('civic', 'like', '%' . $searchQuery . '%')
                                ->orWhere('province', 'like', '%' . $searchQuery . '%')
                                ->orWhere('postal_code', 'like', '%' . $searchQuery . '%')
                                ->orWhere('city', 'like', '%' . $searchQuery . '%');
                        });
                });
            })
            ->paginate($perPage)
            ->through(fn($order) => $this->orderData($order));

        return Inertia::render('Admin/Orders/OrdersContent', [
            'orders' => $orders,
            'sortBy' => $sortBy,
            'sortDirection' => $sortDirection,
            'perPage' => $perPage,
            'sortSearch' => $searchQuery,
        ]);
    }
    public function orderData($order)
    {
        return [
            'id' => $order->id,
            'shipping_status' => $order->shipping_status,
            'payment_status' => $order->payment_status,
            'tracking_number' => $order->tracking_number,
            'total' => $order->total,
            'created_at' => $order->created_at,
            'user' => $order->user,
            'shipping_method' => $order->shippingMethod,
            'order_items' => $order->orderItems,
        ];
    }

    public function edit(Order $order)
    {
        $order->load('user', 'shippingMethod', 'shippingAddress', 'orderItems.product');
        return Inertia::render('Admin/Orders/Edit', [
            'order' => $order
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $shippingAddress = $order->shippingAddress;

        $oldShippingStatus = $order->shipping_status;
        $oldPaymentStatus = $order->payment_status;
        $oldAddress = $shippingAddress->address;
        $oldCivic = $shippingAddress->civic;
        $oldProvince = $shippingAddress->province;
        $oldPostalCode = $shippingAddress->postal_code;
        $oldCity = $shippingAddress->city;

        if ($order != null) {
            $order->shipping_status = $request->input('shipping_status');
            $order->payment_status = $request->input('payment_status');
            $order->save();
        }
        if ($shippingAddress != null) {
            $shippingAddress->address = $request->input('shipping_address.address');
            $shippingAddress->civic = $request->input('shipping_address.civic');
            $shippingAddress->province = $request->input('shipping_address.province');
            $shippingAddress->postal_code = $request->input('shipping_address.postal_code');
            $shippingAddress->city = $request->input('shipping_address.city');
            $shippingAddress->save();
        }

        if (
            $oldShippingStatus != $order->shipping_status || $oldPaymentStatus != $order->payment_status || $oldAddress != $shippingAddress->address ||
            $oldCivic != $shippingAddress->civic || $oldProvince != $shippingAddress->province || $oldPostalCode != $shippingAddress->postal_code ||
            $oldCity != $shippingAddress->city
        ) {
            $messaggio = 'Ordine ID : ' . $order->id . ' - Aggiornato correttamente';
            $tipoMessaggio = 'success';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        } else {
            $messaggio = 'Ordine ID : ' . $order->id . ' - Non aggiornato';
            $tipoMessaggio = 'danger';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        }

        return redirect()->route('orders.index');
    }

    public function delete(Order $order)
    {
        if ($order != null) {
            $order->delete();
        }
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        foreach ($recordIds as $recordId) {
            $order = Order::findOrFail($recordId);
            $order->delete();
        }
    }
}
