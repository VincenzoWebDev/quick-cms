<?php

namespace App\Http\Controllers\Admin;

use App\Models\Page;
use App\Models\PageLayout;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageLayoutController extends \App\Http\Controllers\Controller
{

    public function index()
    {
        $page_layouts = PageLayout::all();
        return Inertia::render('Admin/Settings/PageLayouts/PageLayoutsContent', [
            'pageLayouts' => $page_layouts,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Settings/PageLayouts/Create');
    }

    public function store(Request $request)
    {
        $layout = new PageLayout();
        $layout->name = $request->name;
        $res = $layout->save();

        $messaggio = $res ? 'Layout: ' . $layout->name . ' - Inserito correttamente' : 'Layout: ' . $layout->name . ' - Non Inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('settings.layouts.index');
    }

    public function edit(PageLayout $layout)
    {
        return Inertia::render('Admin/Settings/PageLayouts/Edit', [
            'pageLayout' => $layout,
        ]);
    }

    public function update(Request $request, PageLayout $layout)
    {
        $oldName = $layout->name;
        $layout->name = $request->input('name');
        if ($oldName != $layout->name) {
            $res = $layout->save();
        } else {
            $res = 0;
        }


        $messaggio = $res ? 'Layout: ' . $layout->name . ' - Modificato correttamente' : 'Layout: ' . $layout->name . ' - Non Modificato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('settings.layouts.index');
    }

    public function destroy(PageLayout $layout)
    {
        $layout->delete();
    }
}
