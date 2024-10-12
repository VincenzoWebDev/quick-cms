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
        Schema::create('shipping_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nome del metodo di spedizione (es: "Standard", "Express")
            $table->decimal('price', 8, 2); // Costo della spedizione
            $table->integer('delivery_time'); // Tempo di consegna stimato (in giorni)
            $table->text('description')->nullable(); // Descrizione opzionale
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shipping_methods');
    }
};
