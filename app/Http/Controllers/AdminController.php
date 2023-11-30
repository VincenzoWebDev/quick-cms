<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get();
        $albums = Album::all();
        $photos = Photo::all();
        
        return view(
            'admin.home',
            [
                'users' => $users,
                'albums' => $albums,
                'photos' => $photos
            ]
        );
    }
}
