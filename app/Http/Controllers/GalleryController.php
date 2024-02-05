<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\AlbumCategories;
use App\Models\AlbumCategory;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\View;

class GalleryController extends Controller
{
    public function index()
    {
        $activeTheme = config('themes.active_theme');

        $albums = Album::with('categories')->latest()->paginate(35);
        return view("themes.$activeTheme.pages.gallery", ['albums' => $albums]);
    }

    public function showAlbumImages(Album $album)
    {
        $activeTheme = config('themes.active_theme');

        $images = Photo::where('album_id', $album->id)->latest()->get();
        return view("themes.$activeTheme.pages.images", ['images' => $images]);
    }

    public function showAlbumByCategory(AlbumCategories $category)
    {
        $activeTheme = config('themes.active_theme');

        return view("themes.$activeTheme.pages.album-category")->with('albums', $category->albums);
    }
}
