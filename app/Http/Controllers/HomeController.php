<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return Inertia::render('Front/Themes/' . $this->themeName . '/HomeComponent');
    }
}
