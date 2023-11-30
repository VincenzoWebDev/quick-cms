<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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

Route::get('/', function () {
    return view('welcome');
});

route::prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index']);

    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/{id}/delete', [UserController::class, 'delete']);
    Route::get('/users/{id}/edit', [UserController::class, 'edit']);
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'save'])->name('users.save');
    Route::patch('/users/{id}', [UserController::class, 'store']);

    Route::get('/albums', [AlbumController::class, 'index'])->name('albums');
    Route::delete('/albums/{id}', [AlbumController::class, 'delete'])->name('albums.destroy');
    Route::get('/albums/{id}/edit', [AlbumController::class, 'edit']);
    Route::get('/albums/create', [AlbumController::class, 'create'])->name('albums.create');
    Route::post('/albums', [AlbumController::class, 'save'])->name('albums.save');
    Route::patch('/albums/{id}', [AlbumController::class, 'store']);
    Route::get('/albums/{id}/photos', [AlbumController::class, 'getPhotos'])->name('albums.photos')->where('id', '[0-9]+');

    Route::resource('/photos', PhotoController::class);

});


Route::get('user/demo', function () {
    $user = new User();
    $user->password = Hash::make('test');
    $user->email = 'test@test.it';
    $user->name = 'Enzo';
    $user->save();

    echo 'Utente creato';
});
