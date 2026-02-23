<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_created_with_factory()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
        ]);
    }

    public function test_authenticated_user_can_access_dashboard()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/dashboard')
            ->assertStatus(200);
    }

    public function test_user_add_album()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/admin/albums', [
                'album_name' => 'My First Album',
                'description' => 'This is a test album.',
                'album_thumb' => 'images/album_thumbs/album_602/prova_602.png',
            ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('albums', [
            'album_name' => 'My First Album',
            'user_id' => $user->id,
        ]);
    }
}
