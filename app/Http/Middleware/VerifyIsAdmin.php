<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifyIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(!Auth::user()->isAdmin()){
            
            $messaggio = 'Non sei autorizzato a accedere';
            $tipoMessaggio = 'danger';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

            return redirect()->route('admin');
        }
        return $next($request);
    }
}
