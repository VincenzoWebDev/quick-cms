<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class CheckEcommerceStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = $request->path();
        $ecommerceStatus = Setting::where('key', 'ecommerce_status')->first();
        if ($ecommerceStatus->value === '0') {
            if (Str::startsWith($path, 'admin')) {
                return redirect()->route('admin');
            }
            return redirect()->route('home');
        }
        return $next($request);
    }
}
