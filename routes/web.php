<?php

use App\Http\Controllers\Front\CartController;
use App\Http\Controllers\Front\CheckoutController;
use App\Http\Controllers\Front\UserProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageViewController;
use App\Http\Controllers\ProductDetailController;
use App\Http\Controllers\ProductListController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::prefix('admin')->group(function () {
//     Auth::routes();
// });

// require __DIR__ . '/admin.php';

/* Rotte pagine front-end */

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware('CheckEcommerceStatus')->group(function () {
    Route::get('/prodotti', [ProductListController::class, 'index'])->name('productList');
    Route::get('/prodotti/{slug}/{id}', [ProductDetailController::class, 'index'])->name('productDetail.index')->where('slug', '[a-z0-9-]+')->where('id', '[0-9]+');
    Route::get('/prodotti/{cat}/{subCat}', [ProductListController::class, 'productListCat'])->name('productList.cat');
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
    Route::delete('/cart/remove/{id}', [CartController::class, 'deleteCartItem'])->name('cart.delete')->where('id', '[0-9]+');

    Route::middleware('auth')->group(function () {
        Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
        Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
        Route::get('/checkout/payment/{id}', [CheckoutController::class, 'payment'])->name('checkout.payment')->where('id', '[0-9]+');
        Route::post('/checkout/payment/success', [CheckoutController::class, 'paymentSuccess'])->name('checkout.payment.success');
    });


    Route::middleware('auth')->group(function () {
        Route::get('/user/profile', [UserProfileController::class, 'index'])->name('user.profile.index');
        Route::post('/user/profile/logout', [UserProfileController::class, 'logout'])->name('user.profile.logout');
        Route::get('/user/profile/orders', [UserProfileController::class, 'orders'])->name('user.profile.orders');
        Route::get('/user/profile/completed-orders', [UserProfileController::class, 'completedOrders'])->name('user.profile.completedOrders');
    });
    Route::get('/user/profile/login', [UserProfileController::class, 'login'])->name('user.profile.login.index');
    Route::post('/user/profile/login', [UserProfileController::class, 'loginPost'])->name('user.profile.login');
});

Route::get('/{slug}', [PageViewController::class, 'show'])->name('page.show')->where('slug', '[a-z0-9-]+');


// require __DIR__ . '/theme.php';

// Route::get('testEmail', function () {
//     Mail::to('sports.eco12@gmail.com')->queue(new testEmail());
// });
// Route::view('testEmail', 'mails.testEmail', ['username' => 'Vincenzo']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
