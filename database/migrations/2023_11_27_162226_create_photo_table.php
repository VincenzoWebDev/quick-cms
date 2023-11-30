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
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('name', 128);
            $table->text('description');
            $table->bigInteger('album_id')->unsigned();
            $table->foreign('album_id')->on('albums')->references('id')->onDelete('cascade')->onUpdate('cascade');
            $table->string('img_path', 128);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photo');
    }
};
