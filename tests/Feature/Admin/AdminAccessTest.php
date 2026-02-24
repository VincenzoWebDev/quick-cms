<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_is_redirected_when_accessing_admin_users(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->get(route('users.index'));

        $response->assertRedirect(route('admin'));
    }

    public function test_admin_can_access_admin_users_index(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $response = $this->actingAs($admin)->get(route('users.index'));

        $response
            ->assertOk()
            ->assertInertia(fn(AssertableInertia $page) => $page->component('Admin/Users/UsersContent'));
    }
}
