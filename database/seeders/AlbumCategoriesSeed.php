<?php

namespace Database\Seeders;

use App\Models\AlbumCategories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AlbumCategoriesSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            // 'cars',
            // 'animals',
            'people',
            'nature',
            'buildings',
            'food',
            'sports',
            'fashion',
            'car',
            'computer',
            'game',
            'gaming',
            'war',
            'adventure',
            'horror'
        ];

        foreach ($categories as $category) {
            AlbumCategories::create([
                'category_name' => $category,
            ]);
        }
    }
}
