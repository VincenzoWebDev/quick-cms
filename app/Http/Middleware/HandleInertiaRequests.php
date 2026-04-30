<?php

namespace App\Http\Middleware;

use App\Models\CartItem;
use App\Models\Category;
use App\Models\Page;
use App\Models\Setting;
use App\Services\ThemeResolver;
use Closure;
use Illuminate\Http\Request;
use Inertia\Middleware;

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
        $user = $request->user();
        $isAdminRequest = $request->is('admin*');
        $themeResolver = app(ThemeResolver::class);
        $settingsCache = null;
        $getSetting = function (string $key, $default = false) use (&$settingsCache) {
            if ($settingsCache === null) {
                $settingsCache = Setting::query()
                    ->whereIn('key', ['ecommerce_status', 'demo_mode'])
                    ->pluck('value', 'key');
            }

            return $settingsCache[$key] ?? $default;
        };

        return array_merge(parent::share($request), [
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'status' => fn() => $request->session()->get('status'),
            ],
            /* pagine per la topbar front end */
            'pages' => fn() => $isAdminRequest ? collect() : Page::query()->select('id', 'slug', 'title', 'active')->get(),
            'categories' => fn() => $isAdminRequest ? collect() : Category::whereNull('parent_id')->with(['children'])->get(),
            // 'notifications' => Auth::user() ? Auth::user()->unreadNotifications : null,
            'notifications' => fn() => $user?->unreadNotifications()?->limit(10)?->get() ?? collect(),
            // 'cart_items' => Auth::user() ? CartItem::where('user_id', Auth::user()->id)->with('product')->get() : null,
            'cart_items' => fn() => $user
                ? CartItem::where('user_id', $user->id)->with('product')->get(['id', 'user_id', 'product_id', 'quantity', 'price'])
                : [],
            'user_auth' => fn() => $user ? $user->only(['id', 'name', 'lastname', 'email', 'role', 'profile_img', 'shipping_address', 'billing_address', 'phone']) : null,
            'ecommerce_status' => fn() => $getSetting('ecommerce_status', false),
            'demo_mode' => fn() => $getSetting('demo_mode', false),
            'seo_defaults' => [
                'site_name' => 'Quick CMS - La tua soluzione per la gestione di un e-commerce',
                'site_description' => 'Quick CMS è la soluzione ideale per gestire un e-commerce. Offre funzionalità complete per la gestione dei prodotti, delle categorie, degli ordini e molto altro ancora. Scopri come Quick CMS può aiutarti a gestire il tuo e-commerce in modo efficiente e semplice.',
            ],
            'active_theme' => fn() => $isAdminRequest ? null : [
                'slug' => $themeResolver->getActiveThemeSlug(),
                'manifest' => $themeResolver->readManifest(),
            ],
            'auth' => ['user' => $user?->only(['id', 'name', 'lastname', 'email', 'role', 'profile_img'])],
        ]);
    }

    // public function rootView(Request $request)
    // {
    //     $uri = $request->route() ? $request->route()->uri : '';
    //     $activeTheme = Theme::where('active', true)->first();
    //     $themeName = $activeTheme ? $activeTheme->name : 'default';

    //     if (str_contains($uri, 'admin') || str_contains($uri, 'admin/login') || str_contains($uri, 'admin/register') || str_contains($uri, 'admin/password')) {
    //         return 'layouts.admin.app';
    //     }
    //     if (Str::endsWith($uri, 'user/profile/login')) {
    //         return 'layouts.' . $themeName . '.app';
    //     }
    //     return 'layouts.' . $themeName . '.app';

    //     return parent::rootView($request);
    // }
    public function rootView(Request $request)
    {
        if ($request->is('admin*')) {
            return 'layouts.admin.app';
        }

        return app(ThemeResolver::class)->resolveLayoutView();
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
