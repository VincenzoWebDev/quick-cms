<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Theme;
use App\Models\VariantCombination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductDetailController extends Controller
{
    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    public function index($slug = null, $id)
    {
        $product = Product::where('id', $id)
            ->with('categories', 'productImages')
            ->with([
                'combinations' => function ($query) {
                    $query->with('variantCombinationValues.productVariantValue');
                }
            ])
            ->first();
        $variantNames = ProductVariant::pluck('name', 'id')->toArray();
        $seoMetadata = $product->seoMetadata;

        return Inertia::render(
            'Front/Themes/' . $this->themeName . '/ProductDetail',
            [
                'product' => $product,
                'variantNames' => $variantNames,
                'seo_metadata' => $seoMetadata,
            ]
        );
    }
}
