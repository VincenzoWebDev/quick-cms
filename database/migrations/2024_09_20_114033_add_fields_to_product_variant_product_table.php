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
        Schema::table('product_variant_product', function (Blueprint $table) {
            $table->string('sku')->unique()->nullable();  // SKU specifico per la variante
            $table->string('ean')->nullable();  // Codice EAN specifico
            $table->integer('quantity')->nullable();  // Quantità specifica per la variante
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variant_product', function (Blueprint $table) {
            $table->dropColumn(['sku', 'ean', 'quantity']);
        });
    }
};
