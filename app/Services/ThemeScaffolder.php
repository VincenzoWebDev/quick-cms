<?php

namespace App\Services;

use App\Models\Theme;
use Illuminate\Support\Facades\File;

class ThemeScaffolder
{
    private const DEFAULT_PAGES = [
        'HomeComponent',
        'Page',
    ];

    private const ECOMMERCE_PAGES = [
        'ProductList',
        'ProductDetail',
        'Cart',
        'Checkout',
        'Payment',
        'UserProfile/Login',
        'UserProfile/Profile',
        'UserProfile/Orders',
        'UserProfile/CompletedOrders',
    ];

    public function scaffold(Theme $theme): void
    {
        $slug = $theme->slug ?: $theme->name;
        $parentSlug = $theme->parentTheme?->slug ?: $theme->parentTheme?->name;
        $manifestDir = resource_path("themes/{$slug}");
        $layoutDir = resource_path("views/layouts/{$slug}");

        File::ensureDirectoryExists($manifestDir);
        File::ensureDirectoryExists(resource_path("js/Pages/Front/Themes/{$slug}"));
        File::ensureDirectoryExists($layoutDir);
        File::ensureDirectoryExists(resource_path("css/themes/{$slug}"));
        File::ensureDirectoryExists(public_path("themes/{$slug}/img"));

        foreach ($this->pagesForType($theme->type) as $page) {
            $this->ensurePageFile($slug, $page, $parentSlug);
        }

        $this->ensureLayoutFile($layoutDir . '/app.blade.php');
        $this->ensureCssFile(resource_path("css/themes/{$slug}/app.css"), $slug);
        $this->ensureManifestFile($theme, $manifestDir . '/theme.json');

        $theme->forceFill([
            'path' => "resources/js/Pages/Front/Themes/{$slug}",
            'manifest_path' => "resources/themes/{$slug}/theme.json",
            'has_scaffold' => true,
            'status' => 'ready',
        ])->save();
    }

    private function pagesForType(string $type): array
    {
        return $type === 'ecommerce'
            ? array_merge(self::DEFAULT_PAGES, self::ECOMMERCE_PAGES)
            : self::DEFAULT_PAGES;
    }

    private function ensurePageFile(string $slug, string $page, ?string $parentSlug): void
    {
        $fullPath = resource_path("js/Pages/Front/Themes/{$slug}/{$page}.jsx");

        if (File::exists($fullPath)) {
            return;
        }

        File::ensureDirectoryExists(dirname($fullPath));

        if ($parentSlug) {
            $segments = explode('/', $page);
            $prefix = str_repeat('../', count($segments));
            $importPath = $prefix . $parentSlug . '/' . implode('/', $segments);

            File::put($fullPath, "export { default } from '{$importPath}';\n");
            return;
        }

        $title = str_replace('/', ' / ', $page);

        File::put($fullPath, <<<JSX
import React from 'react';

const ThemePage = () => {
  return <div>{$title} - theme scaffold</div>;
};

export default ThemePage;
JSX);
    }

    private function ensureLayoutFile(string $fullPath): void
    {
        if (File::exists($fullPath)) {
            return;
        }

        $slug = basename(dirname($fullPath));
        $layout = str_replace('SLUG_PLACEHOLDER', $slug, <<<'BLADE'
<!doctype html>
<html lang="it" data-bs-theme="auto">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    @if (env('APP_ENV') == 'production')
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    @endif
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @routes
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/css/themes/SLUG_PLACEHOLDER/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
BLADE);

        File::put($fullPath, $layout);
    }

    private function ensureCssFile(string $fullPath, string $slug): void
    {
        if (!File::exists($fullPath)) {
            File::put($fullPath, ":root {\n  --theme-name: '{$slug}';\n}\n");
        }
    }

    private function ensureManifestFile(Theme $theme, string $fullPath): void
    {
        if (File::exists($fullPath)) {
            return;
        }

        $manifest = [
            'name' => $theme->name,
            'slug' => $theme->slug ?: $theme->name,
            'type' => $theme->type,
            'status' => 'ready',
            'parent' => $theme->parentTheme ? ($theme->parentTheme->slug ?: $theme->parentTheme->name) : null,
            'description' => $theme->description,
            'generated_at' => now()->toAtomString(),
        ];

        File::put($fullPath, json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }
}
