<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\AlbumCategoryRequest;
use App\Http\Requests\EditAlbumCategoryRequest;
use App\Models\AlbumCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AlbumCategoryController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        $albumCategories = AlbumCategories::orderBy('category_name', 'asc')->withCount('albums')->where('user_id', Auth::id())->paginate(env('RECORD_PER_PAGE'));
        return Inertia::render('Admin/AlbumCategories/AlbumCategoriesContent', ['albumCategories' => $albumCategories]);
    }

    public function create()
    {
        return Inertia::render('Admin/AlbumCategories/Create');
    }

    public function store(AlbumCategoryRequest $request)
    {
        $albumsCategory = new AlbumCategories;
        $albumsCategory->category_name = $request->input('category_name');
        $albumsCategory->user_id = Auth::id();
        $res = $albumsCategory->save();

        $messaggio = $res ? 'Categoria ' . $albumsCategory->id . ' inserita correttamente' : 'Categoria non inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('album.categories.index');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(AlbumCategories $category)
    {
        return Inertia::render('Admin/AlbumCategories/Edit', ['category' => $category]);
    }

    public function update(EditAlbumCategoryRequest $request, AlbumCategories $category)
    {
        $oldCategory = $category->category_name;
        $category->category_name = $request->input('category_name');
        if ($oldCategory != $category->category_name) {
            $res = $category->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Categoria ID : ' . $category->id . ' - Aggiornata correttamente' : 'Categoria ID : ' . $category->id . ' - Non aggiornata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('album.categories.index');
    }

    public function destroy(AlbumCategories $category)
    {
        $res = $category->delete();
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        $res = AlbumCategories::whereIn('id', $recordIds)->delete();
    }
}
