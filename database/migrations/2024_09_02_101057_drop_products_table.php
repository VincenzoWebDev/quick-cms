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
        Schema::table('product_images', function (Blueprint $table) {
            $table->dropForeign(['product_id']); // Rimuovi la foreign key
        });

        Schema::dropIfExists('products'); // Elimina la tabella
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
