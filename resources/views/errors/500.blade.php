<?php
use Inertia\Inertia;

$isAdmin = str_starts_with(request()->path(), 'admin');

if (request()->wantsJson()) {
    echo response()->json(['message' => 'Errore del server.'], 500);
} else {
    echo Inertia::render($isAdmin ? 'Admin/AdminErrorPage' : 'Front/Themes/FrontendErrorPage', [
        'status' => 500,
        'message' => 'Errore interno del server. Riprova più tardi.',
    ])
        ->toResponse(request())
        ->getContent();
}
?>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
