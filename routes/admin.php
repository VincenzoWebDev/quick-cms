<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AlbumCategoryController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');

    Route::get('/users', [UserController::class, 'index'])->name('users')->middleware('VerifyIsAdmin');
    Route::get('/users/{id}/destroy', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update');

    Route::get('/albums', [AlbumController::class, 'index'])->name('albums');
    Route::delete('/albums/{id}', [AlbumController::class, 'destroy'])->name('albums.destroy');
    Route::get('/albums/{album}/edit', [AlbumController::class, 'edit'])->name('albums.edit');
    Route::get('/albums/create', [AlbumController::class, 'create'])->name('albums.create');
    Route::post('/albums', [AlbumController::class, 'store'])->name('albums.store');
    Route::patch('/albums/{id}', [AlbumController::class, 'update'])->name('albums.update');
    Route::get('/albums/{id}/photos', [AlbumController::class, 'getPhotos'])->name('albums.photos')->where('id', '[0-9]+');

    Route::middleware('VerifyIsAdmin')->group(function () {
        Route::get('/themes', [ThemeController::class, 'manageTheme'])->name('themes');
        Route::delete('/themes/{theme}', [ThemeController::class, 'destroy'])->name('themes.destroy');
        Route::get('/themes/create', [ThemeController::class, 'create'])->name('themes.create');
        Route::post('/themes', [ThemeController::class, 'store'])->name('themes.store');
        Route::get('/themes/{id}/edit', [ThemeController::class, 'edit'])->name('themes.edit');
        Route::patch('/themes/{id}', [ThemeController::class, 'update'])->name('themes.update');
        Route::post('/themes/{themeId}', [ThemeController::class, 'toggleThemeSwitch']);
    });

    Route::middleware('VerifyIsAdmin')->group(function () {
        Route::resource('/pages', PageController::class);
        Route::post('/pages/{pageId}', [PageController::class, 'togglePageSwitch']);
    });

    Route::resource('/photos', PhotoController::class);

    Route::resource('/categories', AlbumCategoryController::class);

});



