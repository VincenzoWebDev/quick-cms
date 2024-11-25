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
        Schema::table('seo_metadata', function (Blueprint $table) {
            $table->string('canonical_url', 255)->nullable()->after('meta_keywords');
            $table->string('og_title', 255)->nullable()->after('canonical_url');
            $table->text('og_description')->nullable()->after('og_title');
            $table->string('og_image', 255)->nullable()->after('og_description');
            $table->string('twitter_title', 255)->nullable()->after('og_image');
            $table->text('twitter_description')->nullable()->after('twitter_title');
            $table->string('twitter_image', 255)->nullable()->after('twitter_description');
            $table->morphs('seoable'); // Aggiunge due colonne: seoable_id e seoable_type
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('seo_metadata', function (Blueprint $table) {
            $table->dropColumn([
                'canonical_url',
                'og_title',
                'og_description',
                'og_image',
                'twitter_title',
                'twitter_description',
                'twitter_image',
                'seoable_id',
                'seoable_type',
            ]);
        });
    }
};
