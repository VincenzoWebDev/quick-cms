<?php

use App\Http\Controllers\Front\CheckoutController;
use App\Http\Controllers\Front\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageViewController;
use App\Http\Controllers\ProductDetailController;
use App\Http\Controllers\ProductListController;
use App\Http\Controllers\Front\UserProfileController;
use App\Mail\testEmail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

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

Auth::routes();

require __DIR__ . '/admin.php';

/* Rotte pagine front-end */

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/prodotti', [ProductListController::class, 'index'])->name('productList');
Route::get('/prodotti/{slug}/{id}', [ProductDetailController::class, 'index'])->name('productDetail.index')->where('slug', '[a-z0-9-]+')->where('id', '[0-9]+');
Route::get('/prodotti/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/prodotti/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
Route::delete('/prodotti/cart/remove/{id}', [CartController::class, 'deleteCartItem'])->name('cart.delete')->where('id', '[0-9]+');

Route::middleware('auth')->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/payment', [CheckoutController::class, 'payment'])->name('checkout.payment');
    Route::post('/checkout/payment/success', [CheckoutController::class, 'paymentSuccess'])->name('checkout.payment.success');
});


Route::middleware('auth')->group(function () {
    Route::get('/user-profile', [UserProfileController::class, 'index'])->name('front.user.profile');
    Route::post('/user-profile/logout', [UserProfileController::class, 'logout'])->name('front.user.logout');
});
Route::get('/user-profile/login', [UserProfileController::class, 'login'])->name('front.user.login');
Route::post('/user-profile/login', [UserProfileController::class, 'loginPost'])->name('front.user.login.post');

Route::get('/{slug}', [PageViewController::class, 'show'])->name('page.show')->where('slug', '[a-z0-9-]+');

Route::get('/test', function () {
    // Crea un nuovo utente
    $user = User::create([
        'name' => 'test',
        'lastname' => 'test',
        'email' => 'test@test.it',
        'role' => 'admin',
        'password' => Hash::make('test'), // Assicurati di utilizzare una password sicura
    ]);

    return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
});

// require __DIR__ . '/theme.php';

// Route::get('testEmail', function () {
//     Mail::to('sports.eco12@gmail.com')->send(new testEmail());
// });
// Route::view('testEmail', 'mails.testEmail', ['username' => 'Vincenzo']);
