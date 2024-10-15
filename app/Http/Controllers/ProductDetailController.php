<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\VariantCombination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductDetailController extends Controller
{
    public function index($slug = null, $id)
    {
        $product = Product::where('id', $id)->with('categories')->with('productImages')->first();
        $variantCombinationsGroup = VariantCombination::from('variant_combinations as vc') // Definisci l'alias
            ->select(
                'vc.id as combination_id',
                'vc.product_id',
                'vc.price',
                'vc.stock',
                'vc.sku',
                'vc.ean',
                'vc.quantity',
                DB::raw('GROUP_CONCAT(pv.name ORDER BY pv.id ASC) as variant_name'), // Ordinamento per ID
                DB::raw('GROUP_CONCAT(pvv.value ORDER BY pvv.id ASC) as variant_value') // Ordinamento per ID
            )
            ->join('variant_combination_values as vcv', 'vc.id', '=', 'vcv.variant_combination_id')
            ->join('product_variant_values as pvv', 'vcv.product_variant_value_id', '=', 'pvv.id')
            ->join('product_variants as pv', 'pvv.product_variant_id', '=', 'pv.id')
            ->where('vc.product_id', $product->id)
            ->groupBy(
                'vc.id',
                'vc.product_id',
                'vc.price',
                'vc.stock',
                'vc.sku',
                'vc.ean',
                'vc.quantity'
            )
            ->get();
        return Inertia::render('Front/ProductDetail', ['product' => $product, 'variantCombinationsGroup' => $variantCombinationsGroup]);
    }
}
