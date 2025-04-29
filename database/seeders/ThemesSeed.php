<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ThemesSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $themes = [
            [
                'name' => 'quick_cms',
                'active' => 0,
                'path' => null,
                'created_at' => now(),
            ],
            [
                'name' => 'quick_ecommerce',
                'active' => 1,
                'path' => null,
                'created_at' => now(),
            ],
        ];
        foreach ($themes as $theme) {
            DB::table('settings')->updateOrInsert(
                ['name' => $theme['name']],
                [
                    'active' => $theme['active'],
                    'path' => $theme['path'],
                    'created_at' => $theme['created_at'],
                    'updated_at' => now(),
                ]
            );
        }
    }
}
