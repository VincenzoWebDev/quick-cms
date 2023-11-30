<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $queryBuilder = User::orderBy('id', 'asc');
        if (request()->has('id')) {
            $queryBuilder->where('id', '=', request('id'));
        }
        if (request()->has('email')) {
            $queryBuilder->where('email', 'like', '%' . request('email') . '%');
        }
        $users = $queryBuilder->paginate(10);
        return view(
            'admin.users.users',
            [
                'users' => $users
            ]
        );
    }

    public function delete(int $id)
    {
        $res = User::find($id)->delete();

        $messaggio = $res ? 'Utente ID : ' . $id . ' - eliminato correttamente' : 'Utente ID : ' . $id . ' - non eliminato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route("users");
    }

    public function edit(int $id)
    {
        $user = User::find($id);

        return view('admin.users.edit')->with('user', $user);
    }

    public function store($id)
    {
        /*$res = User::find($id)->update([
            'name' => request('name'),
            'email' => request('email')
        ]);*/
        $user = User::find($id);

        $oldName = $user->name;
        $oldEmail = $user->email;

        $user->name = request()->input('name');
        $user->email = request()->input('email');

        if ($oldName != $user->name || $oldEmail != $user->email) {
            $res = $user->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Utente ID : ' . $id . ' - aggiornato correttamente' : 'Utente ID : ' . $id . ' - non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('users');
    }

    public function create()
    {
        return view('admin.users.create');
    }

    public function save()
    {
        /*$res = User::insert([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request('password'))
        ]);*/
        $user = new User();
        $user->name = request()->input('name');
        $user->email = request()->input('email');
        $user->password = Hash::make(request()->input('password'));
        $res = $user->save();

        $messaggio = $res ? 'Utente inserito correttamente' : 'Utente non inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('users');
    }
}
