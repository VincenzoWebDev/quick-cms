<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ThemeViewController extends Controller
{
    public function index()
    {
        $activeTheme = config('themes.active_theme');
        return view("themes.$activeTheme.home");
    }

}
