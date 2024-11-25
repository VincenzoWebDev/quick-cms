<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'price',
        'color',
        'size',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function VariantCombination()
    {
        return $this->belongsTo(VariantCombination::class, 'combination_id');
    }
}
