<?php

namespace Database\Factories;

use App\Models\Album;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PhotoFactory extends Factory
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
            'name' => fake()->text(64),
            'description' => fake()->text(128),
            'album_id' => Album::inRandomOrder()->first()->id,
            'img_path' => fake()->imageUrl(640, 480, fake()->randomElement($category))
        ];
    }
}
