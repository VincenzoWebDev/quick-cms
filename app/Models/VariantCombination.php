<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VariantCombination extends Model
{
    use HasFactory;

    public function variantValues()
    {
        return $this->hasMany(VariantCombinationValue::class, 'variant_combination_id');
    }
}
