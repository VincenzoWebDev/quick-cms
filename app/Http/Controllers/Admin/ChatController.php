<?php

namespace App\Http\Controllers\Admin;

use App\Events\MessageSent;
use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ChatController extends \App\Http\Controllers\Controller
{
    public function index(Request $request, ?Chat $chat = null)
    {
        $role = Auth::user()->role;
        if ($request->user()->role === 'admin') {
            $chats = Chat::with('user')->get(); // Tutte le chat per gli admin
        } else {
            $chats = Chat::where(['user_id' => $request->user()->id, 'status' => 'open'])->with('messages.user')->get();
            if ($chats->isEmpty()) {
                // $chat = Chat::create([
                //     'user_id' => $request->user()->id,
                // ]);
                return Inertia::render('Admin/Chats/ChatsContent', ['role' => $role, 'activeChat' => []]);
            } else {
                $chat = $chats->first();
            }
        }
        if (auth()->user()->role === 'admin' && $chat) {
            $chat->unread_messages = 0;
            $chat->save();
        }
        return Inertia::render('Admin/Chats/ChatsContent', ['chats' => $chats, 'role' => $role, 'activeChat' => $chat ? [$chat->load('user', 'messages.user')] : []]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        // Controlla se l'utente ha già una chat
        $chat = Chat::firstOrCreate([
            'user_id' => $user->id,
            'status' => 'open',
        ]);

        return redirect()->route('chats.index', ['chat' => $chat]);
    }

    public function closeChat(Chat $chat)
    {
        if ($chat) {
            $chat->status = 'close';
            $chat->save();
        }
        return redirect()->route('chats.index');
    }

    // Invia un messaggio
    public function sendMessage(Chat $chat, Request $request)
    {
        $this->authorizeChatAccess($chat, $request->user());

        $message = $chat->messages()->create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);

        // Incrementa il contatore solo se il messaggio è inviato dall'utente
        if (auth()->user()->role !== 'admin') {
            $chat->increment('unread_messages');
        }

        event(new MessageSent($message));

        return Redirect::route('chats.index', ['chat' => $chat]);
    }

    // Controlla se l'utente ha accesso alla chat
    private function authorizeChatAccess(Chat $chat, $user)
    {
        if ($user->role === 'user' && $chat->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }
    }
}
