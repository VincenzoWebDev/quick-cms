<?php

namespace App\Services;

use App\Models\Theme;
use Illuminate\Support\Facades\File;

class ThemeCleanupService
{
    public function deleteThemeAssets(Theme $theme): void
    {
        $slug = $theme->slug ?: $theme->name;

        foreach ($this->pathsForTheme($slug) as $path) {
            if (File::isDirectory($path)) {
                File::deleteDirectory($path);
                continue;
            }

            if (File::exists($path)) {
                File::delete($path);
            }
        }
    }

    private function pathsForTheme(string $slug): array
    {
        return [
            resource_path("js/Pages/Front/Themes/{$slug}"),
            resource_path("views/layouts/{$slug}"),
            resource_path("css/themes/{$slug}"),
            resource_path("themes/{$slug}"),
            resource_path("views/themes/{$slug}"),
            public_path("themes/{$slug}"),
        ];
    }
}
