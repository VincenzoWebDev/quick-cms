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
        Schema::create('variant_combination_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variant_combination_id')->constrained('variant_combinations')->onDelete('cascade');
            $table->foreignId('product_variant_value_id')->constrained('product_variant_values')->onDelete('cascade'); // Colore o Taglia
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('variant_combination_values', function (Blueprint $table) {
            //
        });
    }
};
