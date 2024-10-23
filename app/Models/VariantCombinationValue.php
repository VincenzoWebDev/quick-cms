<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantCombinationValue extends Model
{
    use HasFactory;

    public function productVariantValue()
    {
        return $this->belongsTo(ProductVariantValue::class, 'product_variant_value_id', 'id');
    }
}
