<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ThemeRequest;
use App\Models\Theme;
use App\Services\ThemeCleanupService;
use App\Services\ThemeScaffolder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ThemeController extends \App\Http\Controllers\Controller
{
    public function toggleThemeSwitch(Request $request, $themeId)
    {
        $theme = Theme::findOrFail($themeId);
        $active = (bool) $request->input('active');

        if ($active) {
            Theme::where('id', '!=', $theme->id)->update(['active' => false]);
        }

        $theme->update(['active' => $active]);
    }

    public function index()
    {
        $themes = Theme::with('parentTheme:id,name,slug')
            ->withCount('childThemes')
            ->get();
        return Inertia::render('Admin/Themes/ThemesContent', ['themes' => $themes]);
    }

    public function destroy(Theme $theme, ThemeCleanupService $themeCleanupService)
    {
        if ((int) $theme->active === 1) {
            session()->flash('message', ['tipo' => 'danger', 'testo' => 'Non puoi eliminare un tema attivo']);
            return redirect()->route('themes.index');
        }

        if ($theme->childThemes()->exists()) {
            session()->flash('message', ['tipo' => 'danger', 'testo' => 'Non puoi eliminare un tema usato come base da altri temi']);
            return redirect()->route('themes.index');
        }

        $themeCleanupService->deleteThemeAssets($theme);
        $res = $theme->delete();
        $messaggio = $res ? 'Tema eliminato correttamente' : 'Tema non eliminato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route('themes.index');
    }

    public function destroyBatch(Request $request, ThemeCleanupService $themeCleanupService)
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

        if ($themes->contains(fn($theme) => $theme->childThemes()->exists())) {
            session()->flash('message', ['tipo' => 'danger', 'testo' => 'Non puoi eliminare temi usati come base da altri temi']);
            return redirect()->route('themes.index');
        }

        foreach ($themes as $theme) {
            $themeCleanupService->deleteThemeAssets($theme);
        }

        $deleted = Theme::whereIn('id', $recordIds)->delete();
        $messaggio = $deleted ? 'Temi eliminati correttamente' : 'Nessun tema eliminato';
        $tipoMessaggio = $deleted ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route('themes.index');
    }

    public function store(ThemeRequest $request, ThemeScaffolder $themeScaffolder)
    {
        $slugBase = Str::of($request->input('name'))->slug('_')->toString();
        $slug = $slugBase;
        $suffix = 1;

        while (Theme::where('slug', $slug)->exists()) {
            $slug = $slugBase . '_' . $suffix;
            $suffix++;
        }

        $theme = Theme::create([
            'name' => $request->input('name'),
            'slug' => $slug,
            'path' => 'resources/js/Pages/Front/Themes/' . $slug,
            'type' => $request->input('type', 'content'),
            'description' => $request->input('description'),
            'parent_theme_id' => $request->input('parent_theme_id'),
            'status' => 'draft',
            'active' => false,
        ]);

        $theme->load('parentTheme');
        $themeScaffolder->scaffold($theme);

        if ($request->boolean('activate_after_create')) {
            Theme::where('id', '!=', $theme->id)->update(['active' => false]);
            $theme->update(['active' => true]);
        }

        $res = true;

        $messaggio = $res ? 'Tema ' . $theme->name . ' inserito correttamente' : 'Tema ' . $theme->name . ' non inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route('themes.index');
    }

    public function update(ThemeRequest $request, $id)
    {
        $theme = Theme::findOrFail($id);
        $oldName = $theme->name;
        $oldType = $theme->type;
        $oldDescription = $theme->description;
        $oldParentThemeId = $theme->parent_theme_id;

        $theme->name = $request->input('name');
        $theme->type = $request->input('type', $theme->type);
        $theme->description = $request->input('description', $theme->description);
        $theme->parent_theme_id = $request->input('parent_theme_id', $theme->parent_theme_id);

        if (
            $oldName !== $theme->name
            || $oldType !== $theme->type
            || $oldDescription !== $theme->description
            || $oldParentThemeId !== $theme->parent_theme_id
        ) {
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
