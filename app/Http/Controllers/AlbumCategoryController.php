<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\AlbumCategories;
use App\Models\AlbumCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AlbumCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $albumsCategory = AlbumCategories::orderBy('category_name', 'asc')->withCount('albums')->where('user_id', Auth::id())->paginate(env('RECORD_PER_PAGE'));
        return view('admin.categories.categories', ['albumsCategory' => $albumsCategory]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $albumsCategory = new AlbumCategories;
        $albumsCategory->category_name = $request->input('category_name');
        $albumsCategory->user_id = Auth::id();
        $res = $albumsCategory->save();

        $messaggio = $res ? 'Categoria inserita correttamente' : 'Categoria non inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AlbumCategories $category)
    {
        return view('admin.categories.edit', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AlbumCategories $category)
    {
        $oldCategory = $category->category_name;
        $category->category_name = $request->input('category_name');
        if($oldCategory != $category->category_name){
            $res = $category->save();
        }else{
            $res = 0;
        }

        $messaggio = $res ? 'Categoria ID : ' . $category->id . ' - Aggiornata correttamente' : 'Categoria ID : ' . $category->id . ' - Non aggiornata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AlbumCategories $category)
    {
        $res = $category->delete();

        if (request()->ajax()) {
            return $res;
        } else {
            return redirect()->route('categories.index');
        }
    }
}
