<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CategoryRequest;
use App\Http\Requests\EditCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends \App\Http\Controllers\Controller
{

    public function index()
    {
        $categories = Category::where('parent_id', null)->get();
        $categories->load('children');
        return Inertia::render('Admin/Categories/CategoriesContent', ['categories' => $categories]);
    }

    public function edit($id)
    {
        $category = Category::find($id);
        $categories = Category::where('parent_id', null)->get();
        return Inertia::render('Admin/Categories/Edit', compact('category', 'categories'));
    }

    public function update(EditCategoryRequest $request, Category $category)
    {
        $oldCategory = $category->name;
        $oldDescription = $category->description;
        $oldParentId = $category->parent_id;

        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->parent_id = $request->input('parent_id');

        if ($oldCategory != $category->name || $oldDescription != $category->description || $oldParentId != $category->parent_id) {
            $res = $category->save();
        } else {
            $res = 0;
        }
        $messaggio = $res ? 'Categoria ID : ' . $category->id . ' - Aggiornata correttamente' : 'Categoria ID : ' . $category->id . ' - Non aggiornata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('categories.index');
    }

    public function create()
    {
        $categories = Category::where('parent_id', null)->get();
        return Inertia::render('Admin/Categories/Create', compact('categories'));
    }

    public function store(CategoryRequest $request)
    {
        $category = new Category();
        $category->name = $request->input('name');
        $category->description = $request->input('description');
        $category->parent_id = $request->input('parent_id');
        $res = $category->save();

        $messaggio = $res ? 'Categoria ' . $category->id . ' inserita correttamente' : 'Categoria non inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('categories.index');
    }

    public function destroy(Category $category)
    {
        $res = $category->delete();
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        $res = Category::whereIn('id', $recordIds)->delete();
    }
}
