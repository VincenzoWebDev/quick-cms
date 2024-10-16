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
        Schema::create('product_variant_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_variant_value_id')->constrained('product_variant_values')->onDelete('cascade');
            $table->decimal('price', 8, 2)->nullable(); // Prezzo per variante specifica
            $table->integer('stock')->nullable(); // Stock per variante specifica
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variant_product');
    }
};
