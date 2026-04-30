<?php

namespace App\Http\Controllers;

use App\Services\ThemeResolver;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function getActiveTheme()
    {
        return app(ThemeResolver::class)->getActiveThemeSlug();
    }

    protected function renderThemePage(string $page, array $props = [])
    {
        return \Inertia\Inertia::render(
            app(ThemeResolver::class)->resolveInertiaPage($page),
            $props
        );
    }

    protected function renderThemeView(string $view, array $data = [], ?string $fallback = null)
    {
        return view(
            app(ThemeResolver::class)->resolveBladeThemeView($view, null, $fallback),
            $data
        );
    }
}
