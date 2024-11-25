<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'price', 'stock', 'image_path'];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function combinations()
    {
        return $this->hasMany(VariantCombination::class);
    }

    public function seoMetadata()
    {
        return $this->morphOne(SeoMetadata::class, 'seoable');
    }

    public function getProductsPercentage()
    {
        // Data di inizio e fine del mese corrente
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Data di inizio e fine del mese scorso
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        $currentMonthProductsCount = Product::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();
        $lastMonthProductsCount = Product::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        // Calcolo della percentuale di crescita
        if ($lastMonthProductsCount != 0) {
            $growthPercentage = (($currentMonthProductsCount - $lastMonthProductsCount) / $lastMonthProductsCount) * 100;
        } else {
            $growthPercentage = 0; // per evitare divisione per zero
        }
        return $growthPercentage;
    }
}
