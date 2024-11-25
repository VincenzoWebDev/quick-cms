<?php
use Inertia\Inertia;

$isAdmin = str_starts_with(request()->path(), 'admin');

if (request()->wantsJson()) {
    echo response()->json(['message' => 'Pagina non trovata.'], 404);
} else {
    echo Inertia::render($isAdmin ? 'Admin/AdminErrorPage' : 'Front/Themes/FrontendErrorPage', [
        'status' => 404,
        'message' => 'Pagina non trovata. Controlla l\'URL inserito.',
    ])
        ->toResponse(request())
        ->getContent();
}
