<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EditPageRequest;
use App\Http\Requests\PageRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PageController extends \App\Http\Controllers\Controller
{
    public function togglePageSwitch(Request $request, $pageId)
    {
        $page = Page::findOrFail($pageId);
        $active = $request->input('active') === 1;
        $page->update(['active' => $active]);
    }

    function createSlug($title)
    {
        return Str::slug($title);
    }

    public function index()
    {
        $pages = Page::paginate(env('RECORD_PER_PAGE'));
        // return view('admin.pages.pages')->with('pages', $pages);
        return Inertia::render('Admin/Pages/PagesContent', ['pages' => $pages]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(PageRequest $request)
    {
        $page = new Page();
        $page->title = $request->input('title');
        $page->content = $request->input('content_editor');
        $page->meta_title = $request->input('meta_title');
        $page->meta_description = $request->input('meta_description');
        $page->slug = $this->createSlug($page->title);

        $res = $page->save();

        $messaggio = $res ? 'Pagina ' . $page->title . ' inserita correttamente' : 'Pagina ' . $page->title . ' non inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('pages.index');
    }

    public function show($slug)
    {
        // $currentPage = Page::where('slug', $slug)->where('active', 1)->firstOrFail();
        // return Inertia::render('Home', ['page' => $currentPage]);
    }

    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Edit', ['page' => $page]);
    }

    public function update(EditPageRequest $request, Page $page)
    {
        $oldTitle = $page->title;
        $oldContent = $page->content;
        $oldMetaTitle = $page->meta_title;
        $oldMetaDescription = $page->meta_description;
        $oldSlug = $page->slug;

        $page->title = $request->input('title');
        $page->content = $request->input('content_editor');
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

    public function destroy(Page $page)
    {
        $res = $page->delete();
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        $res = Page::whereIn('id', $recordIds)->delete();
    }
}
