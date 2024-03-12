<?php

namespace App\Http\Middleware;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
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
        return array_merge(parent::share($request), [
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'status' => fn () => $request->session()->get('status'),
            ],
            'pages' => Page::all(), /* pagine per la topbar front end */
            'notifications' => Auth::user() ? Auth::user()->unreadNotifications : null,
        ]);
    }

    public function rootView(Request $request)
    {
        $uri = $request->route()->uri;

        if (str_contains($uri, 'admin') || str_contains($uri, 'login') || str_contains($uri, 'register') || str_contains($uri, 'password')) {
            return 'layouts.admin.app';
        }
        return 'layouts.tema1.app';

        return parent::rootView($request);
    }
}
