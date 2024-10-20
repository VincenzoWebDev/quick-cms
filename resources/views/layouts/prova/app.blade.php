<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>prova</title>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/css/prova/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>