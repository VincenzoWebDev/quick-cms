<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /* ELIMINAZIONE RECORD TABELLE SENZA RESET DI INDIZI E CON LA FOREIGN KEY DISATTIVATA
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        User::truncate();
        Album::truncate();
        Photo::truncate();
        AlbumCategories::truncate();
        */

        /* Questi seeder servono per il corretto funzionamento nel cms */
        $this->call([
            SettingsSeed::class,
            ThemesSeed::class,
            UserDemoSeed::class,
        ]);
        /* IMPORTANTE: ESEGUIRE php artisan db:seed dopo aver fatto la configurazione del DB*/
    }
}
