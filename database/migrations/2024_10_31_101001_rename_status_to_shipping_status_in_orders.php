<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Aggiungi la nuova colonna shipping_status
            $table->string('shipping_status')->nullable()->after('status');
        });

        // Copia i dati da status a shipping_status e poi elimina status
        DB::statement('UPDATE orders SET shipping_status = status');

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Ripristina la colonna status
            $table->string('status')->nullable()->after('shipping_status');
        });

        // Copia i dati indietro da shipping_status a status
        DB::statement('UPDATE orders SET status = shipping_status');

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('shipping_status');
        });
    }
};
