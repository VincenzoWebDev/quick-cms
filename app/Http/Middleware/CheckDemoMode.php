<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckDemoMode
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (setting('demo_mode') && auth()->check() && auth()->user()->email === 'demo@quickcms.test') {
            // Blocca operazioni come salvataggi, cancellazioni ecc.
            if ($request->isMethod('post') || $request->isMethod('put') || $request->isMethod('patch') || $request->isMethod('delete')) {
                return back()->with(
                    'message',
                    ['tipo' => 'danger', 'testo' => 'Operazione non permessa in modalità demo.']
                );
            }
        }

        return $next($request);
    }
}
