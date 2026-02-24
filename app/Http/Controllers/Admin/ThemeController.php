<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ThemeRequest;
use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThemeController extends \App\Http\Controllers\Controller
{
    public function toggleThemeSwitch(Request $request, $themeId)
    {
        $theme = Theme::findOrFail($themeId);
        $active = $request->input('active');
        $theme->update(['active' => $active]);
    }

    public function index()
    {
        $themes = Theme::get();
        return Inertia::render('Admin/Themes/ThemesContent', ['themes' => $themes]);
    }

    public function destroy(Theme $theme)
    {
        if ((int) $theme->active === 1) {
            session()->flash('message', ['tipo' => 'danger', 'testo' => 'Non puoi eliminare un tema attivo']);
            return redirect()->route('themes.index');
        }

        $res = $theme->delete();
        $messaggio = $res ? 'Tema eliminato correttamente' : 'Tema non eliminato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route('themes.index');
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if (!$recordIds || !is_array($recordIds)) {
            return redirect()->route('themes.index');
        }

        $themes = Theme::whereIn('id', $recordIds)->get();
        if ($themes->contains(fn($theme) => (int) $theme->active === 1)) {
            session()->flash('message', ['tipo' => 'danger', 'testo' => 'Rimuovi prima i temi attivi dalla selezione']);
            return redirect()->route('themes.index');
        }

        $deleted = Theme::whereIn('id', $recordIds)->delete();
        $messaggio = $deleted ? 'Temi eliminati correttamente' : 'Nessun tema eliminato';
        $tipoMessaggio = $deleted ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route('themes.index');
    }

    public function store(ThemeRequest $request)
    {
        $theme = new Theme();
        $theme->name = $request->input('name');
        $theme->path = $request->input('path');
        $res = $theme->save();

        $messaggio = $res ? 'Tema ' . $theme->name . ' inserito correttamente' : 'Tema ' . $theme->name . ' non inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        // Percorsi per le cartelle da creare
        // $themeDir = resource_path('js/Pages/Front/themes/' . $theme->name);
        // $cssDir = resource_path('css/' . $theme->name);
        // $viewsDir = resource_path('views/layouts/' . $theme->name);
        // $publicDir = public_path('themes/' . $theme->name);
        // try {
        //     // Crea le cartelle se non esistono già
        //     File::ensureDirectoryExists($themeDir);
        //     File::ensureDirectoryExists($cssDir);
        //     File::ensureDirectoryExists($viewsDir);
        //     File::ensureDirectoryExists($publicDir . '/img');

        //     $res = $theme->save();

        //     $messaggio = $res ? 'Tema ' . $theme->name . ' inserito correttamente' : 'Tema ' . $theme->name . ' non inserito';
        //     $tipoMessaggio = $res ? 'success' : 'danger';
        //     session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        //     return redirect()->route('themes.index');
        // } catch (\Exception $e) {
        //     // Log dell'errore
        //     Log::error('Errore durante la creazione del tema: ' . $e->getMessage());
        //     return redirect()->back()->withErrors(['error' => 'Errore nella creazione del tema.']);
        // }
        return redirect()->route('themes.index');
    }

    public function update(ThemeRequest $request, $id)
    {
        $theme = Theme::findOrFail($id);
        $oldName = $theme->name;
        $oldPath = $theme->path;

        $theme->name = $request->input('name');
        $theme->path = $request->input('path');

        if ($oldName !== $theme->name || $oldPath !== $theme->path) {
            $res = $theme->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Tema ' . $theme->name . ' modificato correttamente' : 'Tema ' . $theme->name . ' non modificato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('themes.index');
    }
}
