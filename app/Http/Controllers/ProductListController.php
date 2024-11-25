<?php

namespace App\Http\Controllers;

use App\Http\Requests\Front\ProductListFilterRequest;
use App\Models\Product;
use App\Models\ProductVariant;
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

    public function index(ProductListFilterRequest $request)
    {
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $perPage = $request->input('perPage', 10);
        $searchQuery = $request->input('q', '');
        $minPrice = $request->input('minPrice', 0);
        $maxPrice = $request->input('maxPrice', 1000);
        $selectedVariants = json_decode($request->input('selectedVariants', '{}'), true);

        $products = Product::when($searchQuery, function ($query) use ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'like', '%' . $searchQuery . '%')
                    ->orWhere('id', 'like', '%' . $searchQuery . '%')
                    ->orWhere('description', 'like', '%' . $searchQuery . '%');
            });
        })
            ->whereBetween('price', [$minPrice, $maxPrice])
            ->when(!empty($selectedVariants), function ($query) use ($selectedVariants) {
                foreach ($selectedVariants as $variantId => $values) {
                    if (!empty($values)) {
                        $query->whereHas('combinations', function ($variantCombinationQuery) use ($variantId, $values) {
                            $variantCombinationQuery->whereHas('variantCombinationValues', function ($variantCombinationValueQuery) use ($variantId, $values) {
                                $variantCombinationValueQuery->whereHas('productVariantValue', function ($productVariantValueQuery) use ($variantId, $values) {
                                    $productVariantValueQuery->where('product_variant_id', $variantId)
                                        ->whereIn('value', $values);
                                });
                            });
                        });
                    }
                }
            })
            ->orderBy($sortBy, $sortDirection)
            ->paginate($perPage);

        $variants = ProductVariant::with('values')->get();
        return Inertia::render(
            'Front/Themes/' . $this->themeName . '/ProductList',
            [
                'products' => $products,
                'sortBy' => $sortBy,
                'sortDirection' => $sortDirection,
                'perPage' => $perPage,
                'sortSearch' => $searchQuery,
                'minPrice' => $minPrice,
                'maxPrice' => $maxPrice,
                'sortVariants' => $selectedVariants,
                'variants' => $variants,
            ]
        );
    }

    public function productListCat($cat, $subCat, ProductListFilterRequest $request)
    {
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $perPage = $request->input('perPage', 10);
        $searchQuery = $request->input('q', '');
        $minPrice = $request->input('minPrice', 0);
        $maxPrice = $request->input('maxPrice', 1000);
        $selectedVariants = json_decode($request->input('selectedVariants', '{}'), true);

        $products = Product::whereHas('categories', function ($query) use ($cat) {
            $query->where('name', $cat);
        })->whereHas('categories', function ($query) use ($subCat) {
            $query->where('name', $subCat);
        })->paginate($perPage);

        $variants = ProductVariant::with('values')->get();
        return Inertia::render(
            'Front/Themes/' . $this->themeName . '/ProductList',
            [
                'products' => $products,
                'sortBy' => $sortBy,
                'sortDirection' => $sortDirection,
                'perPage' => $perPage,
                'sortSearch' => $searchQuery,
                'minPrice' => $minPrice,
                'maxPrice' => $maxPrice,
                'sortVariants' => $selectedVariants,
                'variants' => $variants,
            ]
        );
    }
}
