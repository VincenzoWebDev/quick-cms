<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestTaskController extends Controller
{
    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    public function index()
    {
        return Inertia::render('Front/Themes/' . $this->themeName . '/TestTask/Index', [
            'title' => 'Test Task Page',
        ]);
    }
}
