<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        $orders = Order::with('shippingMethod')->get();
        return Inertia::render('Admin/Orders/OrdersContent', [
            'orders' => $orders
        ]);
    }
}
