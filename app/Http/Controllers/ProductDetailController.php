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

    public function index($id, $slug = null)
    {
        $product = Product::where('id', $id)
            ->with('categories', 'productImages')
            ->with([
                'combinations' => function ($query) {
                    $query->with('variantCombinationValues.productVariantValue');
                }
            ])
            ->first();
        if (!$product) {
            abort(404);
        }
        $variantNames = ProductVariant::pluck('name', 'id')->toArray();
        $seoMetadata = $product->seoMetadata ? $product->seoMetadata->only(['meta_title', 'meta_description', 'meta_keywords']) : null;

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
