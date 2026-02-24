<?php

namespace Tests\Feature\Admin;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ChatArchiveTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_hide_chat_from_panel_without_deleting_it(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $customer = User::factory()->create(['role' => 'user']);
        $chat = Chat::create(['user_id' => $customer->id, 'status' => 'open', 'hidden_by_admin' => false]);

        $this->actingAs($admin)->post(route('chats.hide', $chat))->assertRedirect(route('chats.index'));

        $this->assertDatabaseHas('chats', [
            'id' => $chat->id,
            'hidden_by_admin' => true,
        ]);

        $this->actingAs($admin)
            ->get(route('chats.index'))
            ->assertInertia(fn(AssertableInertia $page) => $page
                ->component('Admin/Chats/ChatsContent')
                ->has('chats', 0)
                ->has('archivedChats', 1));
    }

    public function test_admin_can_open_archived_chat_and_restore_it(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $customer = User::factory()->create(['role' => 'user']);
        $chat = Chat::create(['user_id' => $customer->id, 'status' => 'open', 'hidden_by_admin' => true]);

        $this->actingAs($admin)
            ->get(route('chats.index', ['chat' => $chat->id]))
            ->assertInertia(fn(AssertableInertia $page) => $page
                ->component('Admin/Chats/ChatsContent')
                ->where('activeChat.0.id', $chat->id)
                ->etc());

        $this->actingAs($admin)->post(route('chats.restore', $chat))->assertRedirect(route('chats.index'));

        $this->assertDatabaseHas('chats', [
            'id' => $chat->id,
            'hidden_by_admin' => false,
        ]);
    }
}
