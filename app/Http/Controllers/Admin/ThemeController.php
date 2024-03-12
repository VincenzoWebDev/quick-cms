<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ThemeRequest;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ThemeController extends \App\Http\Controllers\Controller
{
    public function toggleThemeSwitch(Request $request, $themeId)
    {
        $theme = Theme::findOrFail($themeId);
        $active = $request->input('active') === 1;
        $theme->update(['active' => $active]);
    }

    public function index()
    {
        $themes = Theme::get();
        return Inertia::render('Admin/Themes/ThemesContent', ['themes' => $themes]);
    }

    public function destroy(Theme $theme)
    {
        $theme = Theme::findOrFail($theme->id);

        if (!$theme) {
            return response()->json(['error' => 'Tema non trovato'], 404);
        }

        // Eliminazione della cartella del tema in public
        $publicThemePath = public_path("themes/{$theme->name}");
        File::deleteDirectory($publicThemePath);

        // Eliminazione della cartella del tema in resources/views/themes/
        $viewsThemePath = resource_path("views/themes/{$theme->name}");
        File::deleteDirectory($viewsThemePath);

        $res = $theme->delete();
        // return $res;
    }

    public function destroyBatch(Request $request)
    {
        return;
    }

    public function create()
    {
        $theme = new Theme;
        // return view('admin.themes.create', ['theme' => $theme]);
        return Inertia::render('Admin/Themes/Create', ['theme' => $theme]);
    }

    public function store(ThemeRequest $request)
    {
        $theme = new Theme();
        $theme->name = $request->input('name');
        $theme->path = $request->input('path');

        // Creazione della cartella del tema in public
        $publicThemePath = base_path("public/themes/{$theme->name}");
        File::makeDirectory($publicThemePath, 0755, true);

        // Copia degli asset necessari in public
        File::copyDirectory(base_path('public/css'), "{$publicThemePath}/css");
        File::copyDirectory(base_path('public/js'), "{$publicThemePath}/js");
        File::copyDirectory(base_path('public/img'), "{$publicThemePath}/img");
        // ... altre copie di asset se necessario

        // Creazione di un file home.blade.php nella cartella del tema in resources/views/themes/
        $viewsThemePath = resource_path("views/themes/{$theme->name}");
        File::makeDirectory($viewsThemePath, 0755, true);
        File::put("{$viewsThemePath}/home.blade.php", '<h1>Benvenuto nel tema ' . $theme->name . '</h1>');

        $res = $theme->save();

        $messaggio = $res ? 'Tema ' . $theme->name . ' inserito correttamente' : 'Tema ' . $theme->name . ' non inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('themes');
    }

    public function edit($id)
    {
        $theme = Theme::find($id);

        /*if(Gate::denies('manage-album', $album)){
            abort(403, 'Unauthorized');
        }*/
        /*if($album->user->id != Auth::user()->id){
            abort(403, 'Unauthorized');
        }*/
        // return view('admin.themes.edit', ['theme' => $theme]);
        return Inertia::render('Admin/Themes/Edit', ['theme' => $theme]);
    }

    public function update(Request $request, $id)
    {
        $theme = Theme::find($id);
        /*if(Gate::denies('manage-album', $album)){
            abort(403, 'Unauthorized');
        }*/
        $oldName = $theme->name;
        $oldPath = $theme->path;

        $theme->name = $request->input('name');
        $theme->path = $request->input('path');

        if ($oldName != $theme->name || $oldPath != $theme->path) {
            $res = $theme->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? $theme->name . ' - Aggiornato correttamente' : $theme->name . ' - Non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('themes');
    }
}
