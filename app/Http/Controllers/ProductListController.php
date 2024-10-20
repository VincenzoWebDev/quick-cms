<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductListController extends Controller
{
    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    public function index()
    {
        $products = Product::orderBy('id', 'desc')->get();
        return Inertia::render('Front/Themes/' . $this->themeName . '/ProductList', ['products' => $products]);
    }
}
