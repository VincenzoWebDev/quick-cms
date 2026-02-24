<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->index('price', 'products_price_index');
            $table->index('created_at', 'products_created_at_index');
            $table->index('name', 'products_name_index');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->index('name', 'categories_name_index');
        });

        Schema::table('product_variant_values', function (Blueprint $table) {
            $table->index(['product_variant_id', 'value'], 'pvv_variant_value_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variant_values', function (Blueprint $table) {
            $table->dropIndex('pvv_variant_value_index');
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropIndex('categories_name_index');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_name_index');
            $table->dropIndex('products_created_at_index');
            $table->dropIndex('products_price_index');
        });
    }
};
