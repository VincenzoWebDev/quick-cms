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
            $table->dropUnique('product_variant_product_sku_unique'); // Elimina il vincolo unique
            $table->string('sku')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_variant_product', function (Blueprint $table) {
            //
        });
    }
};