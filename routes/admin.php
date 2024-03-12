<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AlbumCategoryController;
use App\Http\Controllers\Admin\AlbumController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PhotoController;
use App\Http\Controllers\Admin\ThemeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProfileController;
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
    Route::put('/notifications/{notificationId}', [AdminController::class, 'markAsRead'])->name('notifications.markAsRead');

    Route::middleware('VerifyIsAdmin')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users');
        Route::get('/users/search', [UserController::class, 'searchUsers'])->name('users.search');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit')->where('id', '[0-9]+');
        Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update')->where('id', '[0-9]+');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy')->where('id', '[0-9]+');
        Route::delete('/users/destroy/batch', [UserController::class, 'destroyBatch'])->name('users.destroy.batch');
    });

    Route::get('/albums', [AlbumController::class, 'index'])->name('albums');
    Route::get('/albums/create', [AlbumController::class, 'create'])->name('albums.create');
    Route::post('/albums', [AlbumController::class, 'store'])->name('albums.store');
    Route::get('/albums/{album}/edit', [AlbumController::class, 'edit'])->name('albums.edit')->where('album', '[0-9]+');
    Route::patch('/albums/{id}', [AlbumController::class, 'update'])->name('albums.update')->where('id', '[0-9]+');
    Route::get('/albums/{id}/photos', [AlbumController::class, 'getPhotos'])->name('albums.photos')->where('id', '[0-9]+');
    Route::delete('/albums/{album}', [AlbumController::class, 'destroy'])->name('albums.destroy')->where('album', '[0-9]+');
    Route::delete('/albums/destroy/batch', [AlbumController::class, 'destroyBatch'])->name('albums.destroy.batch');

    Route::middleware('VerifyIsAdmin')->group(function () {
        Route::get('/themes', [ThemeController::class, 'index'])->name('themes');
        Route::get('/themes/create', [ThemeController::class, 'create'])->name('themes.create');
        Route::post('/themes', [ThemeController::class, 'store'])->name('themes.store');
        Route::get('/themes/{id}/edit', [ThemeController::class, 'edit'])->name('themes.edit')->where('id', '[0-9]+');
        Route::patch('/themes/{id}', [ThemeController::class, 'update'])->name('themes.update')->where('id', '[0-9]+');
        Route::post('/themes/{themeId}', [ThemeController::class, 'toggleThemeSwitch'])->name('themes.switch')->where('themeId', '[0-9]+');
        Route::delete('/themes/{theme}', [ThemeController::class, 'destroy'])->name('themes.destroy')->where('theme', '[0-9]+');
        Route::delete('/themes/destroy/batch', [ThemeController::class, 'destroyBatch'])->name('themes.destroy.batch');
    });

    Route::middleware('VerifyIsAdmin')->group(function () {
        // Route::resource('/pages', PageController::class);
        Route::get('/pages', [PageController::class, 'index'])->name('pages.index');
        Route::get('/pages/create', [PageController::class, 'create'])->name('pages.create');
        Route::post('/pages', [PageController::class, 'store'])->name('pages.store');
        Route::get('/pages/{page}/edit', [PageController::class, 'edit'])->name('pages.edit')->where('page', '[0-9]+');
        Route::patch('/pages/{page}', [PageController::class, 'update'])->name('pages.update')->where('id', '[0-9]+');
        Route::post('/pages/{pageId}', [PageController::class, 'togglePageSwitch'])->name('pages.switch')->where('pageId', '[0-9]+');
        Route::delete('/pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy')->where('page', '[0-9]+');
        Route::delete('/pages/destroy/batch', [PageController::class, 'destroyBatch'])->name('pages.destroy.batch');
    });

    Route::resource('/photos', PhotoController::class);

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::patch('/profile/{userId}', [ProfileController::class, 'update'])->name('profile.update');

    // Route::resource('/categories', AlbumCategoryController::class);
    Route::get('/categories', [AlbumCategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [AlbumCategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [AlbumCategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category}/edit', [AlbumCategoryController::class, 'edit'])->name('categories.edit')->where('category', '[0-9]+');
    Route::patch('/categories/{category}', [AlbumCategoryController::class, 'update'])->name('categories.update')->where('id', '[0-9]+');
    Route::delete('/categories/{category}', [AlbumCategoryController::class, 'destroy'])->name('categories.destroy')->where('category', '[0-9]+');
    Route::delete('/categories/destroy/batch', [AlbumCategoryController::class, 'destroyBatch'])->name('categories.destroy.batch');
});
