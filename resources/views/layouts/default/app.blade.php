<!doctype html>
<html lang="it" data-bs-theme="auto">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    @if (env('APP_ENV') == 'production')
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    @endif
    <meta name="description" content="">
    <meta name="author" content="Vincenzo Designer">
    <meta name="generator" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Tema di default</title>

    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>

    @routes
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/css/default/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    @inertia

</body>

</html>
