<?php

use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\PageViewController;
use App\Http\Controllers\ThemeViewController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Models\Theme;

Route::middleware(['web', 'theme'])->group(function () {
    // Rotta per la homepage
    Route::get('/', [ThemeViewController::class, 'index'])->name('home');

    // Raggruppamento per le rotte relative alla galleria con prefisso 'gallery'
    Route::prefix('gallery')->group(function () {
        // Rotte per la galleria
        Route::get('/', [GalleryController::class, 'index'])->name('gallery');
        Route::get('/{album}/images', [GalleryController::class, 'showAlbumImages'])->name('gallery.album.images');
        Route::get('/album-category/{category}', [GalleryController::class, 'showAlbumByCategory'])->name('gallery.album.category');
    });
});
