<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Str;
use Tests\TestCase;

class NotificationAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_mark_own_notification_as_read(): void
    {
        $user = User::factory()->create();
        $notification = DatabaseNotification::query()->create([
            'id' => (string) Str::uuid(),
            'type' => 'Tests\\Notification',
            'notifiable_type' => User::class,
            'notifiable_id' => $user->id,
            'data' => ['message' => 'test'],
            'read_at' => null,
        ]);

        $this->actingAs($user)
            ->put(route('notifications.markAsRead', $notification->id))
            ->assertNoContent();

        $this->assertNotNull($notification->fresh()->read_at);
    }

    public function test_user_cannot_mark_other_users_notification_as_read(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $foreignNotification = DatabaseNotification::query()->create([
            'id' => (string) Str::uuid(),
            'type' => 'Tests\\Notification',
            'notifiable_type' => User::class,
            'notifiable_id' => $otherUser->id,
            'data' => ['message' => 'test'],
            'read_at' => null,
        ]);

        $this->actingAs($user)
            ->put(route('notifications.markAsRead', $foreignNotification->id))
            ->assertForbidden();

        $this->assertNull($foreignNotification->fresh()->read_at);
    }
}
