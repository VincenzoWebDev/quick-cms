<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EditPageRequest;
use App\Http\Requests\PageRequest;
use App\Models\Page;
use App\Models\PageLayout;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class PageController extends \App\Http\Controllers\Controller
{
    public function togglePageSwitch(Request $request, $pageId)
    {
        $page = Page::findOrFail($pageId);
        $active = $request->input('active');
        $page->update(['active' => $active]);
    }

    function createSlug($title)
    {
        return Str::slug($title);
    }

    public function index()
    {
        $pages = Page::orderBy('id', 'desc')->with('layout')->paginate(env('IMG_PER_PAGE'));
        return Inertia::render('Admin/Pages/PagesContent', ['pages' => $pages]);
    }

    public function create()
    {
        $pageLayout = PageLayout::all();
        return Inertia::render('Admin/Pages/Create', ['pageLayout' => $pageLayout]);
    }

    public function storeImage(Request $request)
    {
        if (!$request->hasFile('file')) {
            return false;
        }
        $file = $request->file('file');
        if (!$file->isValid()) {
            return false;
        }
        // $fileName = $request->file('file')->getClientOriginalName();
        // $imgFileName = str_replace(' ', '_', $fileName);
        // $imgName = time() . '_' . $imgFileName;        
        $fileExtension = $file->extension();
        $fileNameExt = $file->getClientOriginalName();
        $fileName = pathinfo($fileNameExt, PATHINFO_FILENAME);
        $fileName = str_replace(' ', '_', $fileName);
        $fileName = $fileName . '_' . time() . '.' . $fileExtension;

        $imgFile = $file->storeAs(env('UPLOADS_DIR'), $fileName, 'public');

        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);
        $width = $image->width();
        $height = $image->height();

        // Costruire l'URL pubblico per l'immagine
        $filePath = asset('storage/' . env('UPLOADS_DIR') . $fileName);
        // dd($filePath);

        return response()->json(['location' => $filePath, 'name' => $fileName, 'width' => $width, 'height' => $height]);
    }

    public function store(PageRequest $request)
    {
        $page = new Page();
        $page->title = $request->input('title');
        $page->content = $request->input('content_editor');
        $page->layout_id = $request->input('layout_id');
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
        $pageLayout = PageLayout::all();
        return Inertia::render('Admin/Pages/Edit', ['page' => $page, 'pageLayout' => $pageLayout]);
    }

    public function update(EditPageRequest $request, Page $page)
    {
        $oldTitle = $page->title;
        $oldContent = $page->content;
        $oldLayout = $page->layout_id;
        $oldMetaTitle = $page->meta_title;
        $oldMetaDescription = $page->meta_description;
        $oldSlug = $page->slug;

        $page->title = $request->input('title');
        $page->content = $request->input('content_editor');
        $page->layout_id = $request->input('layout_id');
        $page->meta_title = $request->input('meta_title');
        $page->meta_description = $request->input('meta_description');
        $page->slug = $this->createSlug($page->title);

        if ($oldTitle != $page->title || $oldContent != $page->content || $oldMetaTitle != $page->meta_title || $oldMetaDescription != $page->meta_description || $oldLayout != $page->layout_id || $oldSlug != $page->slug) {
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
