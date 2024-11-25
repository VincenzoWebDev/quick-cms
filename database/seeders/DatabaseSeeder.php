<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Album;
use App\Models\AlbumCategories;
use App\Models\Photo;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //\App\Models\User::factory(30)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        /* ELIMINAZIONE RECORD TABELLE SENZA RESET DI INDIZI E CON LA FOREIGN KEY DISATTIVATA
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        User::truncate();
        Album::truncate();
        Photo::truncate();
        AlbumCategories::truncate();
        */
    }
}
