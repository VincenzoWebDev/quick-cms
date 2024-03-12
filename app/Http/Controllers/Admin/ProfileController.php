<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EditProfileRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends \App\Http\Controllers\Controller
{
    /**
     * Display the user's profile form.
     */
    public function index()
    {
        return Inertia::render('Admin/Profile/ProfileContent');
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(EditProfileRequest $request, $userId)
    {
        $user = User::find($userId);
        $oldName = $user->name;
        $oldLastName = $user->lastname;
        $oldEmail = $user->email;
        $oldRole = $user->role;

        $user->name = $request->input('name');
        $user->lastname = $request->input('lastname');
        $user->email = $request->input('email');
        $user->role = $request->input('role');

        if ($oldName != $user->name || $oldLastName != $user->lastname || $oldEmail != $user->email || $oldRole != $user->role) {
            $res = $user->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Informazioni profilo aggiornate correttamente' : 'Informazioni profilo non aggiornate';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
    }

    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }
}
