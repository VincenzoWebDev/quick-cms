<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('album_categories', function (Blueprint $table) {
            // Rimuovi prima la chiave esistente
            $table->dropForeign(['user_id']);

            // Poi ricrea con il comportamento cascade
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('album_categories', function (Blueprint $table) {
            $table->dropForeign(['user_id']);

            // Ripristina senza cascade (opzionale)
            $table->foreign('user_id')
                ->references('id')->on('users');
        });
    }
};
