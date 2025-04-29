<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserDemoSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'demo',
            'lastname' => 'demo',
            'role' => 'admin',
            'profile_img' => 'images/profile_img/default.png',
            'email' => 'demo@quickcms.test',
            'email_verified_at' => now(),
            'password' => Hash::make('Demo1234'),
            'remember_token' => Str::random(10),
        ]);
    }
}
