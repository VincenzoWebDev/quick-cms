<?php

namespace App\Http\Middleware;

use App\Models\Theme;
use Closure;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class ThemeMiddleware
{

    public function handle($request, Closure $next)
    {
        $activeTheme = $this->getActiveTheme();
        if ($activeTheme == 'default') {
            config(['themes.active_theme' => $activeTheme]);
            return $next($request);
        } else {
            $activeThemeName = $activeTheme->name;
            config(['themes.active_theme' => $activeThemeName]);

            $viewPath = $this->getViewPath($request, $activeThemeName);

            if (View::exists($viewPath)) {
                return $next($request);
            } else {
                abort(404);
            }
        }
    }

    protected function getActiveTheme()
    {
        $activeTheme = Theme::where('active', true)->first();
        if ($activeTheme) {
            return $activeTheme;
        } else {
            $activeTheme = 'default';
            return $activeTheme;
        }
    }

    protected function getViewPath($request, $activeThemeName)
    {
        $routeName = Route::currentRouteName();

        switch ($routeName) {
            case 'home':
                return "themes.$activeThemeName.$routeName";
                break;
            case 'gallery':
                return "themes.$activeThemeName.pages.$routeName";
                break;
            case 'gallery.album.images':
                return "themes.$activeThemeName.pages.images";
                break;
            case 'gallery.album.category':
                return "themes.$activeThemeName.pages.gallery";
                break;
        }
    }
}
