<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('shipping_method_id')->nullable()->after('payment_status');

            // Se vuoi creare una relazione con una tabella `shipping_methods`, puoi aggiungere la foreign key:
            $table->foreign('shipping_method_id')->references('id')->on('shipping_methods')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['shipping_method_id']);
            $table->dropColumn('shipping_method_id');
        });
    }
};
