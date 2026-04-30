<?php

namespace App\Services;

use App\Models\Theme;
use Illuminate\Support\Facades\File;

class ThemeResolver
{
    private const DEFAULT_THEME_SLUG = 'default';

    public function getActiveTheme(): ?Theme
    {
        return Theme::query()
            ->with('parentTheme')
            ->where('active', true)
            ->first();
    }

    public function getActiveThemeSlug(): string
    {
        return $this->getThemeSlug($this->getActiveTheme()) ?? self::DEFAULT_THEME_SLUG;
    }

    public function resolveInertiaPage(string $page, ?Theme $theme = null): string
    {
        foreach ($this->themeChain($theme) as $slug) {
            $candidate = "Front/Themes/{$slug}/{$page}";

            if (file_exists(resource_path("js/Pages/{$candidate}.jsx"))) {
                return $candidate;
            }
        }

        return "Front/Themes/" . self::DEFAULT_THEME_SLUG . "/{$page}";
    }

    public function resolveLayoutView(?Theme $theme = null): string
    {
        foreach ($this->themeChain($theme) as $slug) {
            $candidate = "layouts.{$slug}.app";

            if (view()->exists($candidate)) {
                return $candidate;
            }
        }

        return 'layouts.default.app';
    }

    public function resolveBladeThemeView(string $view, ?Theme $theme = null, ?string $fallback = null): string
    {
        foreach ($this->themeChain($theme) as $slug) {
            $candidate = "themes.{$slug}.{$view}";

            if (view()->exists($candidate)) {
                return $candidate;
            }
        }

        if ($fallback && view()->exists($fallback)) {
            return $fallback;
        }

        abort(404, "Theme view [{$view}] not found.");
    }

    public function readManifest(?Theme $theme = null): ?array
    {
        $resolvedTheme = $theme ?? $this->getActiveTheme();

        if (!$resolvedTheme) {
            return null;
        }

        $manifestPath = $resolvedTheme->manifest_path
            ? base_path($resolvedTheme->manifest_path)
            : resource_path('themes/' . $this->getThemeSlug($resolvedTheme) . '/theme.json');

        if (!File::exists($manifestPath)) {
            return null;
        }

        $decoded = json_decode(File::get($manifestPath), true);

        return is_array($decoded) ? $decoded : null;
    }

    public function getThemeSlug(?Theme $theme): ?string
    {
        if (!$theme) {
            return null;
        }

        return $theme->slug ?: $theme->name;
    }

    public function themeChain(?Theme $theme = null): array
    {
        $currentTheme = $theme ?? $this->getActiveTheme();
        $chain = [];
        $seen = [];

        while ($currentTheme) {
            $slug = $this->getThemeSlug($currentTheme);

            if (!$slug || isset($seen[$slug])) {
                break;
            }

            $chain[] = $slug;
            $seen[$slug] = true;
            $currentTheme = $currentTheme->parentTheme;
        }

        if (!isset($seen[self::DEFAULT_THEME_SLUG])) {
            $chain[] = self::DEFAULT_THEME_SLUG;
        }

        return $chain;
    }
}
