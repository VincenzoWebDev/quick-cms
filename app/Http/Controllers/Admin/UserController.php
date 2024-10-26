<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EditUserRequest;
use App\Http\Requests\UserFilterRequest;
use App\Http\Requests\UserRequest;
use App\Models\AlbumCategories;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class UserController extends \App\Http\Controllers\Controller
{
    public function index(UserFilterRequest $request)
    {
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $perPage = $request->input('perPage', 10);
        $searchQuery = $request->input('q', '');

        $users = User::orderBy($sortBy, $sortDirection)
            ->when($searchQuery, function ($query) use ($searchQuery) {
                $query->where(function ($query) use ($searchQuery) {
                    $query->where('id', 'like', '%' . $searchQuery . '%')
                        ->orWhere('name', 'like', '%' . $searchQuery . '%')
                        ->orWhere('email', 'like', '%' . $searchQuery . '%')
                        ->orWhere('role', 'like', '%' . $searchQuery . '%');
                });
            })->paginate($perPage)->through(fn($user) => [
                'id' => $user->id,
                'profile_img' => $user->profile_img,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at
            ]);

        return Inertia::render('Admin/Users/UsersContent', [
            'users' => $users,
            'sortBy' => $sortBy,
            'sortDirection' => $sortDirection,
            'perPage' => $perPage,
            'sortSearch' => $searchQuery,
        ]);
    }

    public function destroy(int $id)
    {
        $user = User::find($id);
        $profileImg = $user->profile_img;
        AlbumCategories::where('user_id', $id)->delete();
        $res = $user->forceDelete(); //DB::delete();
        if ($res) {
            // Costruisci il percorso completo del file utilizzando il nome del file
            $ProfilePath = public_path('storage/' . $profileImg);
            // Verifica se l'immagine esiste prima di eliminarla
            if (file_exists($ProfilePath) && $profileImg != null) {
                unlink($ProfilePath); // Elimina l'immagine dal filesystem
            }
        }
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        foreach ($recordIds as $recordId) {
            $user = User::find($recordId);
            $profileImg = $user->profile_img;
            AlbumCategories::where('user_id', $user->id)->delete();
            $res = $user->forceDelete();
            if ($res) {
                // Costruisci il percorso completo del file utilizzando il nome del file
                $ProfilePath = public_path('storage/' . $profileImg);
                // Verifica se l'immagine esiste prima di eliminarla
                if (file_exists($ProfilePath) && $profileImg != null) {
                    unlink($ProfilePath); // Elimina l'immagine dal filesystem
                }
            }
        }
    }

    public function edit(int $id)
    {
        $user = User::find($id);

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(EditUserRequest $request, $id)
    {
        $user = User::find($id);

        $oldName = $user->name;
        $oldLastName = $user->lastname;
        $oldEmail = $user->email;
        $oldRole = $user->role;
        $oldProfile = $user->profile_img;

        $user->name = $request->input('name');
        $user->lastname = $request->input('lastname');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        $user->profile_img = $request->input('profile_img') == null ? $oldProfile : $request->input('profile_img');

        if ($oldName != $user->name || $oldLastName != $user->lastname || $oldEmail != $user->email || $oldRole != $user->role || $request->hasFile('profile_img')) {
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
            $res = $user->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Utente ID : ' . $id . ' - Aggiornato correttamente' : 'Utente ID : ' . $id . ' - Non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('users.index');
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(UserRequest $request)
    {
        $user = new User();
        $user->name = $request->input('name');
        $user->lastname = $request->input('lastname');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        $user->password = Hash::make($request->input('password'));
        $user->profile_img = '';
        $res = $user->save();

        if ($res) {
            $this->processFile($user->id, $user);
            $user->save();
        }

        $messaggio = $res ? 'Utente ' . $user->id . ' inserito correttamente' : 'Utente ' . $user->id . ' non inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('users.index');
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
}
