<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Album>
 */
class AlbumFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = [
            'cars',
            'animals',
            'people',
            'nature',
            'buildings',
            'food'
        ];
        return [
            'album_name' => fake()->name(),
            'description' => fake()->text(128),
            'user_id' => User::inRandomOrder()->first()->id,
            'album_thumb' => fake()->imageUrl(120, 120, fake()->randomElement($category))
        ];
    }
}
