<!doctype html>
<html lang="it" data-bs-theme="auto">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Vincenzo Designer">
    <meta name="generator" content="">
    <title>Quick CMS</title>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

    <link href="{{ asset('themes/quick_cms/css/style.css') }}?={{ time() }}" rel="stylesheet">
    {{-- <link href="{{ asset('themes/quick_cms/css/bootstrap.min.css') }}?={{ time() }}" rel="stylesheet"> --}}

    @routes
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>
