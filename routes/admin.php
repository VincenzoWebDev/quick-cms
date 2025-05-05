<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AlbumCategoryController;
use App\Http\Controllers\Admin\AlbumController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\FileController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PhotoController;
use App\Http\Controllers\Admin\ThemeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PageLayoutController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductVariantController;
use App\Http\Controllers\Admin\ProductVariantValueController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\ShippingMethodController;
use App\Http\Controllers\Admin\ChatController;
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


// Route::prefix('admin')->middleware('auth', 'CheckDemoMode')->group(function () {

Route::get('/', [AdminController::class, 'index'])->name('admin');
Route::put('/notifications/{notificationId}', [AdminController::class, 'markAsRead'])->name('notifications.markAsRead');

Route::middleware('VerifyIsAdmin')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
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
Route::patch('/albums/{album}', [AlbumController::class, 'update'])->name('albums.update')->where('album', '[0-9]+');
Route::get('/albums/{id}/photos', [AlbumController::class, 'getPhotos'])->name('albums.photos')->where('id', '[0-9]+');
Route::delete('/albums/{album}', [AlbumController::class, 'destroy'])->name('albums.destroy')->where('album', '[0-9]+');
Route::delete('/albums/destroy/batch', [AlbumController::class, 'destroyBatch'])->name('albums.destroy.batch');
// Photo albums
Route::resource('/photos', PhotoController::class);
Route::delete('/photos/destroy/batch', [PhotoController::class, 'destroyBatch'])->name('photos.destroy.batch');

Route::middleware('VerifyIsAdmin')->group(function () {
    Route::get('/themes', [ThemeController::class, 'index'])->name('themes.index');
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
    Route::patch('/pages/{page}', [PageController::class, 'update'])->name('pages.update')->where('page', '[0-9]+');
    Route::post('/pages/{pageId}', [PageController::class, 'togglePageSwitch'])->name('pages.switch')->where('pageId', '[0-9]+');
    Route::delete('/pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy')->where('page', '[0-9]+');
    Route::delete('/pages/destroy/batch', [PageController::class, 'destroyBatch'])->name('pages.destroy.batch');
    Route::post('/pages/images/store', [PageController::class, 'storeImage'])->name('pages.images.store');
});

Route::get('/profile', [ProfileController::class, 'index'])->name('admin.profile');
Route::patch('/profile/{userId}', [ProfileController::class, 'update'])->name('admin.profile.update');

// Route::resource('/categories', AlbumCategoryController::class);
Route::get('/album_categories', [AlbumCategoryController::class, 'index'])->name('album.categories.index');
Route::get('/album_categories/create', [AlbumCategoryController::class, 'create'])->name('album.categories.create');
Route::post('/album_categories', [AlbumCategoryController::class, 'store'])->name('album.categories.store');
Route::get('/album_categories/{category}/edit', [AlbumCategoryController::class, 'edit'])->name('album.categories.edit')->where('category', '[0-9]+');
Route::patch('/album_categories/{category}', [AlbumCategoryController::class, 'update'])->name('album.categories.update')->where('id', '[0-9]+');
Route::delete('/album_categories/{category}', [AlbumCategoryController::class, 'destroy'])->name('album.categories.destroy')->where('category', '[0-9]+');
Route::delete('/album_categories/destroy/batch', [AlbumCategoryController::class, 'destroyBatch'])->name('album.categories.destroy.batch');

Route::middleware('VerifyIsAdmin')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index'])->name('articles');
});

Route::middleware('VerifyIsAdmin', 'CheckEcommerceStatus')->group(function () {
    Route::resource('/products', ProductController::class);
    Route::delete('/products/destroy/batch', [ProductController::class, 'destroyBatch'])->name('products.destroy.batch');
    // Route::post('/products/generate-combinations', [ProductController::class, 'generateCombinations'])->name('products.generate.combinations');
    Route::delete('/products/{id}/destroy-combination', [ProductController::class, 'destroyCombination'])->name('products.destroy.combination');
    Route::delete('/products/destroy/combination-batch', [ProductController::class, 'destroyCombinationBatch'])->name('products.destroy.combination.batch');
    Route::patch('/products/{id}/update-combination', [ProductController::class, 'updateCombination'])->name('products.update.combination');
    Route::delete('/products/images/{productImage}', [ProductController::class, 'imagesDestroy'])->name('product.images.destroy');
    Route::delete('/products/images/destroy/batch', [ProductController::class, 'imagesDestroyBatch'])->name('product.images.destroy.batch');

    Route::resource('/categories', CategoryController::class);
    Route::delete('/categories/destroy/batch', [CategoryController::class, 'destroyBatch'])->name('categories.destroy.batch');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/search', [OrderController::class, 'searchOrders'])->name('orders.search');
    Route::get('orders/edit/{order}', [OrderController::class, 'edit'])->name('orders.edit');
    Route::patch('/orders/{order}', [OrderController::class, 'update'])->name('orders.update');
    Route::delete('/orders/{order}', [OrderController::class, 'delete'])->name('orders.destroy');
    Route::delete('/orders/destroy/batch', [OrderController::class, 'destroyBatch'])->name('orders.destroy.batch');

    Route::resource('/shipping-methods', ShippingMethodController::class);
});

Route::get('/chats/{chat?}', [ChatController::class, 'index'])->name('chats.index');
Route::post('/chats', [ChatController::class, 'store'])->name('chats.store');
Route::post('/chats/{chat}/close', [ChatController::class, 'closeChat'])->name('chats.close');
Route::post('/chats/{chat}/messages', [ChatController::class, 'sendMessage'])->name('chats.messages.store');

Route::middleware('VerifyIsAdmin')->group(function () {
    Route::get('/files', [FileController::class, 'index'])->name('files');
    Route::post('/files', [FileController::class, 'store'])->name('files.store');
    Route::get('/files/download', [FileController::class, 'fileDownload'])->name('files.download');
    Route::delete('/files/destroy', [FileController::class, 'destroy'])->name('files.destroy');
    Route::get('/files/images', [FileController::class, 'images'])->name('files.images');
    Route::get('/files/documents', [FileController::class, 'documents'])->name('files.documents');
    Route::get('/files/video', [FileController::class, 'video'])->name('files.video');
});

Route::middleware('VerifyIsAdmin')->group(function () {
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::get('/settings/create', [SettingController::class, 'create'])->name('settings.create');
    Route::post('/settings', [SettingController::class, 'store'])->name('settings.store');
    Route::get('/settings/edit/{setting}', [SettingController::class, 'edit'])->name('settings.edit');
    Route::patch('/settings/{setting}', [SettingController::class, 'update'])->name('settings.update');
    Route::delete('/settings/{setting}', [SettingController::class, 'destroy'])->name('settings.destroy');
    Route::post('/settings/{settingId}', [SettingController::class, 'toggleSettingSwitch'])->name('settings.switch')->where('settingId', '[0-9]+');

    Route::get('/settings/layouts', [PageLayoutController::class, 'index'])->name('settings.layouts.index');
    Route::get('/settings/layouts/create', [PageLayoutController::class, 'create'])->name('settings.layouts.create');
    Route::post('/settings/layouts', [PageLayoutController::class, 'store'])->name('settings.layouts.store');
    Route::get('/settings/layouts/{layout}/edit', [PageLayoutController::class, 'edit'])->name('settings.layouts.edit');
    Route::patch('/settings/layouts/{layout}', [PageLayoutController::class, 'update'])->name('settings.layouts.update');
    Route::delete('/settings/layouts/{layout}', [PageLayoutController::class, 'destroy'])->name('settings.layouts.destroy');

    Route::middleware('CheckEcommerceStatus')->group(function () {
        Route::get('settings/variants', [ProductVariantController::class, 'index'])->name('settings.variants.index');
        Route::get('settings/variants/create', [ProductVariantController::class, 'create'])->name('settings.variants.create');
        Route::post('settings/variants', [ProductVariantController::class, 'store'])->name('settings.variants.store');
        Route::get('settings/variants/{variant}/edit', [ProductVariantController::class, 'edit'])->name('settings.variants.edit');
        Route::patch('settings/variants/{variant}', [ProductVariantController::class, 'update'])->name('settings.variants.update');
        Route::delete('settings/variants/{variant}', [ProductVariantController::class, 'destroy'])->name('settings.variants.destroy');

        Route::get('settings/variant-values/create', [ProductVariantValueController::class, 'create'])->name('settings.variant-values.create');
        Route::post('settings/variant-values', [ProductVariantValueController::class, 'store'])->name('settings.variant-values.store');
        Route::get('settings/variant-values/{variant_value}/edit', [ProductVariantValueController::class, 'edit'])->name('settings.variant-values.edit');
        Route::patch('settings/variant-values/{variant_value}', [ProductVariantValueController::class, 'update'])->name('settings.variant-values.update');
        Route::delete('settings/variant-values/{variant_value}', [ProductVariantValueController::class, 'destroy'])->name('settings.variant-values.destroy');
    });
});
// });
