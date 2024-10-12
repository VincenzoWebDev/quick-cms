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
            $table->string('color')->nullable()->after('price'); // Aggiunge la colonna color dopo price
            $table->string('size')->nullable()->after('color');  // Aggiunge la colonna size dopo color
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn('color');
            $table->dropColumn('size');
        });
    }
};
