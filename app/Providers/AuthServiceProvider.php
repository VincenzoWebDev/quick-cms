<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use App\Models\Album;
use App\Models\Photo;
use App\Models\Post;
use App\Models\User;
use App\Policies\AlbumPolicy;
use App\Policies\PhotoPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Album::class => AlbumPolicy::class,
        Photo::class => PhotoPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {

    }
}
