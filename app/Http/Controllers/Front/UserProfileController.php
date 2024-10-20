<?php

namespace App\Http\Controllers\Front;

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
        return Inertia::render('Front/Themes/' . $this->themeName . '/UserProfile/UserProfileContent');
    }

    public function login()
    {
        return Inertia::render('Front/' . $this->themeName . '/UserProfile/Login');
    }
    public function loginPost(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
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
        return redirect('/');
    }
}
