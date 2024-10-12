<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/SettingsContent');
    }
}
