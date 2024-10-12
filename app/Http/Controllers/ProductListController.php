<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductListController extends Controller
{
    public function index(){
        $products = Product::orderBy('id', 'desc')->get();
        return Inertia::render('Front/ProductList', ['products' => $products]);
    }
}
