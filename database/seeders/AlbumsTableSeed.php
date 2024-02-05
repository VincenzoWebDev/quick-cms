<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\AlbumCategories;
use App\Models\AlbumCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlbumsTableSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Album::factory(30)->create()->each(function($album){
            $categories = AlbumCategories::inRandomOrder()->take(3)->pluck('id');
            $categories->each(function($cat_id) use($album) {
                AlbumCategory::create([
                    'album_id' => $album->id,
                    'category_id' => $cat_id
                ]);
            });
        });
    }
}
