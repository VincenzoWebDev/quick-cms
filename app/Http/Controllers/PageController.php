<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditPageRequest;
use App\Http\Requests\PageRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function togglePageSwitch(Request $request, $pageId)
    {
        try {
            $page = Page::findOrFail($pageId);
            $page->update(['active' => $request->input('active') == 'true']);

            return response()->json(['success' => true, 'message' => 'Stato della pagina aggiornato con successo.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Errore durante l\'aggiornamento dello stato della pagina.']);
        }
    }
    function createSlug($title)
    {
        return Str::slug($title);
    }

    public function index()
    {
        $pages = Page::get();
        return view('admin.pages.pages')->with('pages', $pages);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.pages.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PageRequest $request)
    {
        $page = new Page();
        $page->title = $request->input('title');
        $page->content = $request->input('content');
        $page->meta_title = $request->input('meta_title');
        $page->meta_description = $request->input('meta_description');
        $page->slug = $this->createSlug($page->title);

        $res = $page->save();

        $messaggio = $res ? 'Pagina inserita correttamente' : 'Pagina non inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('pages.index');
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
    public function edit(Page $page)
    {
        return view('admin.pages.edit')->with('page', $page);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditPageRequest $request, Page $page)
    {
        $oldTitle = $page->title;
        $oldContent = $page->content;
        $oldMetaTitle = $page->meta_title;
        $oldMetaDescription = $page->meta_description;
        $oldSlug = $page->slug;

        $page->title = $request->input('title');
        $page->content = $request->input('content');
        $page->meta_title = $request->input('meta_title');
        $page->meta_description = $request->input('meta_description');
        $page->slug = $this->createSlug($page->title);

        if ($oldTitle != $page->title || $oldContent != $page->content || $oldMetaTitle != $page->meta_title || $oldMetaDescription != $page->meta_description || $oldSlug != $page->slug) {
            $res = $page->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Pagina ID : ' . $page->id . ' - Aggiornata correttamente' : 'Pagina ID : ' . $page->id . ' - Non aggiornata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('pages.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        $res = $page->delete();
        if (request()->ajax()) {
            return $res;
        } else {
            return redirect()->route('albums');
        }
    }
}
