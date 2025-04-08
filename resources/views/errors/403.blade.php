<?php
use Inertia\Inertia;

$isAdmin = str_starts_with(request()->path(), 'admin');

if (request()->wantsJson()) {
    echo response()->json(['message' => 'Accesso negato.'], 403);
} else {
    echo Inertia::render($isAdmin ? 'Admin/AdminErrorPage' : 'Front/Themes/FrontendErrorPage', [
        'status' => 403,
        'message' => 'Accesso negato. Non hai i permessi necessari per accedere a questa pagina.',
    ])
        ->toResponse(request())
        ->getContent();
}
?>

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
