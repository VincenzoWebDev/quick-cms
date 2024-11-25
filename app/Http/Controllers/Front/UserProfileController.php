<?php

namespace App\Http\Controllers\Front;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserProfileController extends \App\Http\Controllers\Controller
{
    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    public function index()
    {
        return Inertia::render('Front/Themes/' . $this->themeName . '/UserProfile/Profile');
    }

    public function login()
    {
        if (Auth::check()) {
            return redirect()->route('home');
        }
        return Inertia::render('Front/Themes/' . $this->themeName . '/UserProfile/Login');
    }
    public function loginPost(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required' => 'L\'email è obbligatoria.',
            'email.email' => 'L\'email non è valida.',
            'password.required' => 'La password è obbligatoria.',
        ]);
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('home');
        }
        return back()->withErrors([
            'email' => 'Le credenziali fornite non corrispondono ai nostri registri.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }

    public function orders()
    {
        $orders = Order::where('user_id', Auth::user()->id)
            ->where(function ($query) {
                $query->where('shipping_status', '!=', 'shipped')
                    ->orWhere('payment_status', '!=', 'paid');
            })
            ->with('orderItems.product')
            ->get();

        return Inertia::render('Front/Themes/' . $this->themeName . '/UserProfile/Orders', compact('orders'));
    }

    public function completedOrders()
    {
        $completedOrders = Order::where(['shipping_status' => 'delivered', 'payment_status' => 'paid', 'user_id' => Auth::user()->id])->with('orderItems.product')->get();
        return Inertia::render('Front/Themes/' . $this->themeName . '/UserProfile/CompletedOrders', compact('completedOrders'));
    }
}
