<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\UserController;
use App\Mail\testEmail;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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

// Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('user/demo', function () {
    $user = new User();
    $user->password = Hash::make('enzo');
    $user->email = 'enzo@enzo.com';
    $user->name = 'enzo';
    $user->save();

    echo 'Utente creato';
});

Route::get('react', function () {
    return view('welcome');
});

Auth::routes();

require __DIR__ . '/admin.php';

require __DIR__ . '/theme.php';

Route::get('testEmail', function(){
    Mail::to('sports.eco12@gmail.com')->send(new testEmail());
});

//Route::view('testEmail', 'mails.testEmail', ['username' => 'Vincenzo']);