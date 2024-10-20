<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageViewController extends Controller
{
    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $currentPage = Page::where('slug', $slug)->where('active', 1)->firstOrFail();
        $pageLayout = $currentPage->layout;
        return Inertia::render('Front/Themes/'.$this->themeName.'/Page', ['currentPage' => $currentPage, 'pageLayout' => $pageLayout]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
