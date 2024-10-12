<?php

namespace App\Http\Controllers\Front;

use App\Models\CartItem;
use App\Models\ShippingMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        $cartItems = CartItem::with('product')->where('user_id', auth()->id())->get();
        $shippingMethods = ShippingMethod::all();
        return Inertia::render('Front/Checkout', [
            'cartItems' => $cartItems,
            'shippingMethods' => $shippingMethods,
        ]);
    }
}
