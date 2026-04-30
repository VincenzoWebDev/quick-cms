<?php

namespace App\Http\Controllers;

use App\Http\Requests\Front\ProductListFilterRequest;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ProductListController extends Controller
{
    private const PRODUCT_CACHE_TAG = 'products';
    private const PRODUCT_CACHE_TTL_SECONDS = 300;
    private const VARIANTS_CACHE_KEY = 'product_list_variants_with_values';
    private const VARIANTS_CACHE_TTL_SECONDS = 1800;

    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    public function index(ProductListFilterRequest $request)
    {
        $filters = $this->extractFilters($request);
        $cacheKey = $this->makeCacheKey('all', $filters);

        $products = Cache::tags([self::PRODUCT_CACHE_TAG])->remember(
            $cacheKey,
            self::PRODUCT_CACHE_TTL_SECONDS,
            function () use ($filters) {
                $query = Product::query();
                $this->applyFilters($query, $filters);

                return $query
                    ->orderBy($filters['sortBy'], $filters['sortDirection'])
                    ->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
            }
        );

        $variants = $this->getCachedVariants();
        return $this->renderThemePage(
            'ProductList',
            [
                'products' => $products,
                'sortBy' => $filters['sortBy'],
                'sortDirection' => $filters['sortDirection'],
                'perPage' => $filters['perPage'],
                'sortSearch' => $filters['searchQuery'],
                'minPrice' => $filters['minPrice'],
                'maxPrice' => $filters['maxPrice'],
                'sortVariants' => $filters['selectedVariants'],
                'variants' => $variants,
            ]
        );
    }

    public function productListCat($cat, $subCat, ProductListFilterRequest $request)
    {
        $filters = $this->extractFilters($request);
        $cacheKey = $this->makeCacheKey('cat:' . $cat . ':' . $subCat, $filters);

        $products = Cache::tags([self::PRODUCT_CACHE_TAG])->remember(
            $cacheKey,
            self::PRODUCT_CACHE_TTL_SECONDS,
            function () use ($filters, $cat, $subCat) {
                $query = Product::query()
                    ->whereHas('categories', function ($categoryQuery) use ($cat) {
                        $categoryQuery->where('name', $cat);
                    })
                    ->whereHas('categories', function ($categoryQuery) use ($subCat) {
                        $categoryQuery->where('name', $subCat);
                    });

                $this->applyFilters($query, $filters);

                return $query
                    ->orderBy($filters['sortBy'], $filters['sortDirection'])
                    ->paginate($filters['perPage'], ['*'], 'page', $filters['page']);
            }
        );

        $variants = $this->getCachedVariants();
        return $this->renderThemePage(
            'ProductList',
            [
                'products' => $products,
                'sortBy' => $filters['sortBy'],
                'sortDirection' => $filters['sortDirection'],
                'perPage' => $filters['perPage'],
                'sortSearch' => $filters['searchQuery'],
                'minPrice' => $filters['minPrice'],
                'maxPrice' => $filters['maxPrice'],
                'sortVariants' => $filters['selectedVariants'],
                'variants' => $variants,
            ]
        );
    }

    private function extractFilters(ProductListFilterRequest $request): array
    {
        return [
            'sortBy' => $request->input('sortBy', 'id'),
            'sortDirection' => $request->input('sortDirection', 'desc'),
            'perPage' => (int) $request->input('perPage', 10),
            'page' => (int) $request->input('page', 1),
            'searchQuery' => trim((string) $request->input('q', '')),
            'minPrice' => (float) $request->input('minPrice', 0),
            'maxPrice' => (float) $request->input('maxPrice', 1000),
            'selectedVariants' => $this->normalizeSelectedVariants(
                json_decode((string) $request->input('selectedVariants', '{}'), true) ?: []
            ),
        ];
    }

    private function normalizeSelectedVariants(array $selectedVariants): array
    {
        foreach ($selectedVariants as $variantId => $values) {
            $values = is_array($values) ? array_values(array_unique($values)) : [];
            sort($values);
            $selectedVariants[(string) $variantId] = $values;
        }

        ksort($selectedVariants);

        return $selectedVariants;
    }

    private function makeCacheKey(string $scope, array $filters): string
    {
        return 'products_' . md5(json_encode([
            'scope' => $scope,
            'q' => $filters['searchQuery'],
            'minPrice' => $filters['minPrice'],
            'maxPrice' => $filters['maxPrice'],
            'selectedVariants' => $filters['selectedVariants'],
            'sortBy' => $filters['sortBy'],
            'sortDirection' => $filters['sortDirection'],
            'perPage' => $filters['perPage'],
            'page' => $filters['page'],
        ]));
    }

    private function applyFilters(Builder $query, array $filters): void
    {
        $query
            ->when($filters['searchQuery'], function (Builder $productQuery) use ($filters) {
                $productQuery->where(function (Builder $searchQuery) use ($filters) {
                    $searchQuery->where('name', 'like', '%' . $filters['searchQuery'] . '%')
                        ->orWhere('id', 'like', '%' . $filters['searchQuery'] . '%')
                        ->orWhere('description', 'like', '%' . $filters['searchQuery'] . '%');
                });
            })
            ->whereBetween('price', [$filters['minPrice'], $filters['maxPrice']])
            ->when(!empty($filters['selectedVariants']), function (Builder $productQuery) use ($filters) {
                foreach ($filters['selectedVariants'] as $variantId => $values) {
                    if (empty($values)) {
                        continue;
                    }

                    $productQuery->whereHas('combinations', function (Builder $variantCombinationQuery) use ($variantId, $values) {
                        $variantCombinationQuery->whereHas('variantCombinationValues', function (Builder $variantCombinationValueQuery) use ($variantId, $values) {
                            $variantCombinationValueQuery->whereHas('productVariantValue', function (Builder $productVariantValueQuery) use ($variantId, $values) {
                                $productVariantValueQuery
                                    ->where('product_variant_id', $variantId)
                                    ->whereIn('value', $values);
                            });
                        });
                    });
                }
            });
    }

    private function getCachedVariants()
    {
        return Cache::tags([self::PRODUCT_CACHE_TAG])->remember(
            self::VARIANTS_CACHE_KEY,
            self::VARIANTS_CACHE_TTL_SECONDS,
            fn () => ProductVariant::with('values')->get()
        );
    }
}
