<?php

namespace Database\Seeders;

use App\Models\ProductVariantValue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariantValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $values = ['Rosso', 'Verde', 'Blu', 'Bianco', 'Nero', 'Grigio', 'Marrone', 'Giallo', 'Arancione', 'Viola', 'Turchese', 'Ciano', 'Magenta', 'Rosa', 'Lilà', 'Fucsia'];
        foreach ($values as $value) {
            ProductVariantValue::create([
                'product_variant_id' => 1,
                'value' => $value,
            ]);
        }
        $values = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
        foreach ($values as $value) {
            ProductVariantValue::create([
                'product_variant_id' => 2,
                'value' => $value,
            ]);
        }
    }
}
