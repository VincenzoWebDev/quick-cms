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
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

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
        $oldProfile = $user->profile_img;

        $user->name = $request->input('name');
        $user->lastname = $request->input('lastname');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        $user->profile_img = $request->input('profile_img') == null ? $oldProfile : $request->input('profile_img');

        if ($request->file('profile_img') != null) {
            if ($oldProfile == null) {
                $this->processFile($user->id, $user);
            }
            if ($oldProfile != null) {
                Storage::delete($oldProfile);
            }
            $this->processFile($user->id, $user);
        } else {
            $user->profile_img = $oldProfile;
        }
        $user->save();
        return redirect()->route('profile');
    }

    public function processFile($id, &$user)
    {
        if (!request()->hasFile('profile_img')) {
            return false;
        }
        $file = request()->file('profile_img');

        if (!$file->isValid() || $file == null) {
            return false;
        }
        $fileName = $user->name . '_' . $id . '.' . $file->extension();
        $file = $file->storeAs(env('PROFILE_IMG_DIR'), $fileName, 'public');
        $filePath = public_path('storage/' . env('PROFILE_IMG_DIR') . '/' . $fileName);
        $this->createThumbnail($filePath);
        $user->profile_img = env('PROFILE_IMG_DIR') . $fileName;
    }

    public function createThumbnail($filePath)
    {
        try {
            $manager = new ImageManager(new Driver());
            $image = $manager->read($filePath);
            // resize image proportionally to 300px width
            $image->scale(width: 300);
            $image->save($filePath);
        } catch (\Exception $e) {
            return false;
        }
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
