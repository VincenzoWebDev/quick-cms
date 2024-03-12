<?php

namespace App\Http\Controllers\Admin;

use App\Models\Album;
use App\Models\AlbumCategories;
use App\Models\Notification;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get();
        $albums = Album::all();
        $photos = Photo::all();
        $albumCategories = AlbumCategories::all();
        // istanzo le classi per prendere i metodi che mi servono per i grafici
        $usersData = new User();
        $albumsData = new Album();
        $categoriesData = new AlbumCategories();
        $photosData = new Photo();
        $dataChart = $usersData->getUserAlbumCatDataChart();
        $usersPercentage = $usersData->getUsersPercentage();
        $albumsPercentage = $albumsData->getAlbumsPercentage();
        $categoriesPercentage = $categoriesData->getCategoriesPercentage();
        $photosPercentage = $photosData->getPhotosPercentage();

        return Inertia::render('Admin/Home', [
            'users' => $users,
            'albums' => $albums,
            'photos' => $photos,
            'albumCategories' => $albumCategories,
            'dataChart' => $dataChart,
            'usersPercentage' => $usersPercentage,
            'albumsPercentage' => $albumsPercentage,
            'categoriesPercentage' => $categoriesPercentage,
            'photosPercentage' => $photosPercentage
        ]);
    }

    public function markAsRead(Notification $notificationId)
    {
        $notificationId->markAsRead();
    }
}
