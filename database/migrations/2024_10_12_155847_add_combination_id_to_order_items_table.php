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
        Schema::table('order_items', function (Blueprint $table) {
            $table->unsignedBigInteger('combination_id')->nullable()->after('price'); // Aggiungi il campo
            $table->foreign('combination_id')->references('id')->on('variant_combinations')->onDelete('cascade'); // Imposta la foreign key
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign(['combination_id']); // Rimuovi la foreign key
            $table->dropColumn('combination_id'); // Rimuovi il campo
        });
    }
};
