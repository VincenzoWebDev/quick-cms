<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'address',
        'civic',
        'province',
        'postal_code',
        'city',
    ];
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
