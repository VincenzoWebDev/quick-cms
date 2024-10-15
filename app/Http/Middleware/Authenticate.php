<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Controlla se l'URL contiene 'admin'
        if ($request->is('admin') || $request->is('admin/*')) {
            return route('login'); // Reindirizza a login per admin
        }
        return $request->expectsJson() ? null : route('front.user.login'); // Reindirizza a user/login per pubblico
    }
}
