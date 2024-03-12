<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageViewController;
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

/* Rotte pagine front-end */
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('page/{slug}', [PageViewController::class, 'show'])->name('page.show');



Auth::routes();


require __DIR__ . '/admin.php';




// require __DIR__ . '/theme.php';

// Route::get('testEmail', function () {
//     Mail::to('sports.eco12@gmail.com')->send(new testEmail());
// });
// Route::view('testEmail', 'mails.testEmail', ['username' => 'Vincenzo']);