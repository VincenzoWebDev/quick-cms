<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Page;
use App\Models\Product;
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
        $categories = Category::whereNull('parent_id')
            ->with('children')
            ->get();
        $products = Product::get();
        return Inertia::render('Front/Themes/' . $this->themeName . '/HomeComponent', compact('categories', 'products'));
    }
}
