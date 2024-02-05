<?php

namespace App\Http\Controllers;

use App\DataTables\UsersDataTable;
use App\Http\Requests\EditUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Yajra\DataTables\Facades\DataTables;

class UserController extends Controller
{
    public function index(UsersDataTable $dataTable)
    {
        $users = User::query();

        if (request()->ajax()) {
            return DataTables::of($users)
                ->addColumn('action', function ($user) {
                    return $this->userButtons($user->id);
                })
                ->rawColumns(['action'])
                ->make(true);
        }
        return view('admin.users.users');
        //return $dataTable->render('admin.users.users');
    }
    private function userButtons($id)
    {
        $buttonEdit = '<a href="'.route('users.edit', $id).'" id="edit-'.$id.'" class="btn btn-outline-success me-3">
            <i class="fa-regular fa-pen-to-square"></i>
        </a>';

        $buttonDelete = '<a href="'.route('users.destroy', $id).'" id="delete-'.$id.'" class="btn btn-outline-danger me-3">
            <i class="fa-regular fa-trash-can"></i>
        </a>';

        return $buttonEdit . $buttonDelete;
    }

    public function destroy(int $id)
    {
        $res = User::find($id)->delete();

        $messaggio = $res ? 'Utente ID : ' . $id . ' - Eliminato correttamente' : 'Utente ID : ' . $id . ' - Non eliminato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route("users");
    }

    public function edit(int $id)
    {
        $user = User::find($id);

        return view('admin.users.edit')->with('user', $user);
    }

    public function update(EditUserRequest $request,$id)
    {
        /*$res = User::find($id)->update([
            'name' => request('name'),
            'email' => request('email')
        ]);*/
        $user = User::find($id);

        $oldName = $user->name;
        $oldEmail = $user->email;
        $oldRole = $user->role;

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role = $request->input('role');

        if ($oldName != $user->name || $oldEmail != $user->email || $oldRole != $user->role) {
            $res = $user->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Utente ID : ' . $id . ' - Aggiornato correttamente' : 'Utente ID : ' . $id . ' - Non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('users');
    }

    public function create()
    {
        return view('admin.users.create');
    }

    public function store(UserRequest $request)
    {
        /*$res = User::insert([
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request('password'))
        ]);*/
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role = $request->input('role');
        $user->password = Hash::make($request->input('password'));
        $res = $user->save();

        $messaggio = $res ? 'Utente inserito correttamente' : 'Utente non inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('users');
    }
}
