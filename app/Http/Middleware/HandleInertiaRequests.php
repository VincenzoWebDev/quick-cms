<?php

namespace App\Http\Middleware;

use App\Models\CartItem;
use App\Models\Category;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Theme;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Middleware;
use Illuminate\Support\Str;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'status' => fn() => $request->session()->get('status'),
            ],
            'pages' => Page::all(), /* pagine per la topbar front end */
            'categories' => Category::whereNull('parent_id')->with('children')->get(),
            'notifications' => Auth::user() ? Auth::user()->unreadNotifications : null,
            'cart_items' => Auth::user() ? CartItem::where('user_id', Auth::user()->id)->with('product')->get() : null,
            'user_auth' => Auth::user() ? Auth::user() : null,
            'ecommerce_status' => Setting::where('key', 'ecommerce_status')->first()->value,
            'seo_defaults' => [
                'site_name' => 'Quick CMS - La tua soluzione per la gestione di un e-commerce',
                'site_description' => 'Quick CMS è la soluzione ideale per gestire un e-commerce. Offre funzionalità complete per la gestione dei prodotti, delle categorie, degli ordini e molto altro ancora. Scopri come Quick CMS può aiutarti a gestire il tuo e-commerce in modo efficiente e semplice.',
            ],
        ]);
    }

    public function rootView(Request $request)
    {
        $uri = $request->route() ? $request->route()->uri : null;
        $activeTheme = Theme::where('active', true)->first();
        $themeName = $activeTheme ? $activeTheme->name : 'default';

        if (str_contains($uri, 'admin') || str_contains($uri, 'admin/login') || str_contains($uri, 'admin/register') || str_contains($uri, 'admin/password')) {
            return 'layouts.admin.app';
        }
        if (Str::endsWith($uri, 'user/profile/login')) {
            return 'layouts.' . $themeName . '.app';
        }
        return 'layouts.' . $themeName . '.app';

        return parent::rootView($request);
    }

    public function handle($request, Closure $next)
    {
        // Se la rotta richiede esplicitamente JSON (es. per chiamate API)
        if ($request->is('admin/chats*') && $request->wantsJson()) {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}
