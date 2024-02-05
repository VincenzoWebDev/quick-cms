<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ThemeController extends Controller
{
    public function toggleThemeSwitch(Request $request, $themeId)
    {
        try {
            $theme = Theme::findOrFail($themeId);
            $theme->update(['active' => $request->input('active') == 'true']);

            return response()->json(['success' => true, 'message' => 'Stato del tema aggiornato con successo.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Errore durante l\'aggiornamento dello stato del tema.']);
        }
    }

    public function manageTheme()
    {
        $themes = Theme::get();
        return view('admin.themes.themes', ['themes' => $themes]);
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

        return $res;
    }

    public function create()
    {
        $theme = new Theme;
        return view('admin.themes.create', ['theme' => $theme]);
    }

    public function store(Request $request)
    {
        /*$res = Album::insert([
            'album_name' => request('album_name'),
            'description' => request('description'),
            'user_id' => User::InRandomOrder()->first()->id
        ]);*/
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

        $messaggio = $res ? 'Tema inserito correttamente' : 'Tema non inserito';
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
        return view('admin.themes.edit', ['theme' => $theme]);
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

        $messaggio = $res ? 'Tema ID : ' . $id . ' - Aggiornato correttamente' : 'Tema ID : ' . $id . ' - Non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('themes');
    }
}
