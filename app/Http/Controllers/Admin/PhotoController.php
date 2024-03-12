<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EditPhotoRequest;
use App\Http\Requests\PhotoRequest;
use App\Models\Album;
use App\Models\Photo;
use Hamcrest\Arrays\IsArray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class PhotoController extends \App\Http\Controllers\Controller
{

    public function __construct()
    {
        $this->authorizeResource(Photo::class);
    }

    public function index()
    {
        $photos = Photo::orderBy('id', 'desc')->paginate(env('IMG_PER_PAGE'));
        return view('admin.images.photos', ["photos" => $photos]);
    }

    public function create()
    {
        $photo = new Photo;
        $albums = $this->getAlbums()->where('user_id', Auth::user()->id);
        // return view('admin.images.create', ['photo' => $photo, 'albums' => $albums]);
        return Inertia::render('Admin/Photos/Create', ['photo' => $photo, 'albums' => $albums]);
    }

    public function store(PhotoRequest $request)
    {
        if (is_array($request->file('img_path'))) {
            $res = $this->processArrayFile($request);

            $messaggio = $res ? 'Immagini inserite correttamente' : 'Immagine non inseriti';
            $tipoMessaggio = $res ? 'success' : 'danger';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

            return redirect()->route('albums.photos', $request->album_id);
        } else {
            $photo = new Photo();
            $photo->name = $request->input('name');
            $photo->description = $request->input('description');
            $photo->album_id = $request->album_id;
            $photo->img_path = '';
            $photo->thumb_path = '';
            $res = $photo->save();

            if ($res) {
                $this->processFile($photo, $request);
                $res = $photo->save();
            }

            $messaggio = $res ? 'Immagine: ' . $photo->name . ' - Inserita correttamente' : 'Immagine: ' . $photo->name . ' - Non inserita';
            $tipoMessaggio = $res ? 'success' : 'danger';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

            return redirect()->route('albums.photos', $photo->album_id);
        }
    }

    public function show(Photo $photo)
    {
    }

    public function edit(Photo $photo)
    {
        $albums = $this->getAlbums()->where('user_id', Auth::user()->id);
        // return view('admin.images.edit',['photo' => $photo,  'albums' => $albums]);
        return Inertia::render('Admin/Photos/Edit', ['photo' => $photo,  'albums' => $albums]);
    }

    public function update(EditPhotoRequest $request, Photo $photo)
    {
        $oldName = $photo->name;
        $oldDescription = $photo->description;
        $old_album_id = $photo->album_id;
        $oldPath = $photo->img_path;
        $old_thumb_path = $photo->thumb_path;

        if ($request->hasFile('img_path')) {
            $this->updateFile($oldPath, $old_thumb_path);
        }
        $photo->name = $request->input('name');
        $photo->description = $request->input('description');
        $photo->album_id = $request->album_id;
        $photo->img_path = $request->input('img_path') == null ? $oldPath : $request->input('img_path');
        $this->processFile($photo, $request);

        if ($oldName != $photo->name || $oldDescription != $photo->description || $old_album_id != $photo->album_id || $oldPath != $photo->img_path) {
            $res = $photo->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Immagine ID : ' . $photo->id . ' - Aggiornata correttamente' : 'Immagine ID : ' . $photo->id . ' - Non aggiornata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('albums.photos', $photo->album_id);
    }

    public function destroy(Photo $photo)
    {
        $photo = Photo::find($photo->id);

        if (!$photo) {
            return false;
        }
        $res = $photo->delete();
        if ($res) {
            $this->deleteFile($photo);
        }
    }

    public function processFile(Photo $photo, $request)
    {
        if (!$request->hasFile('img_path')) {
            return false;
        }
        $file = $request->file('img_path');
        if (!$file->isValid()) {
            return false;
        }

        if (!is_array($file)) {
            if ($file->isValid()) {
                $originalName = $photo->name;
                $imgName = str_replace(' ', '_', $originalName);
                $extension = $file->extension();
                $time = time();
                $dirAlbumId = 'album_' . $photo->album_id;
                $fileNameStore = $imgName . '_' . $time . '.' . $extension;
                $fileNameThumb = 'thumb_' . $imgName . '_' . $time . '.' . $extension;

                //crea thumbnail
                $request->file('img_path')->storeAs(env('IMG_PHOTO_ALBUMS') . $dirAlbumId, $fileNameStore, 'public');
                $request->file('img_path')->storeAs(env('IMG_PHOTO_ALBUM_THUMBS') . $dirAlbumId, $fileNameThumb, 'public');

                $fileNameThumbPath = public_path('storage/' . env('IMG_PHOTO_ALBUM_THUMBS') . $dirAlbumId . '/' . $fileNameThumb);
                $this->createThumbnail($fileNameThumbPath);
                $photo->thumb_path = env('IMG_PHOTO_ALBUM_THUMBS') . $dirAlbumId . '/' . $fileNameThumb;
                $photo->img_path = env('IMG_PHOTO_ALBUMS') . $dirAlbumId . '/' . $fileNameStore;
            }
        }
    }

    public function processArrayFile($request)
    {
        if (!$request->hasFile('img_path')) {
            return false;
        }
        $file = $request->file('img_path');
        $name = $request->input('name');
        $description = $request->input('description');
        $albumId = $request->album_id;

        if (is_array($file)) {
            if (count($file) > 1) {
                $count = 0;
                foreach ($file as $img) {
                    $originalName = $name;
                    $imgName = str_replace(' ', '_', $originalName);
                    $extension = $img->extension();
                    $time = time();
                    $dirAlbumId = 'album_' . $albumId;
                    $fileNameStore = $imgName . '_' . $count . '_' . $time . '.' . $extension;
                    $fileNameThumb = 'thumb_' . $imgName . '_' . $count . '_' . $time . '.' . $extension;

                    // Crea thumbnail
                    $img->storeAs(env('IMG_PHOTO_ALBUMS') . $dirAlbumId, $fileNameStore, 'public');
                    $img->storeAs(env('IMG_PHOTO_ALBUM_THUMBS') . $dirAlbumId, $fileNameThumb, 'public');
                    $fileNameThumbPath = public_path('storage/' . env('IMG_PHOTO_ALBUM_THUMBS') . $dirAlbumId . '/' . $fileNameThumb);
                    $this->createThumbnail($fileNameThumbPath);

                    // Crea un nuovo modello Photo per ogni immagine
                    $photo = new Photo();
                    $photo->name = $name;
                    $photo->description = $description;
                    $photo->album_id = $albumId;
                    $photo->thumb_path = env('IMG_PHOTO_ALBUM_THUMBS') . $dirAlbumId . '/' . $fileNameThumb;
                    $photo->img_path = env('IMG_PHOTO_ALBUMS') . $dirAlbumId . '/' . $fileNameStore;
                    $res = $photo->save();
                    $count++;
                }
                return $res;
            }
        }
    }

    public function createThumbnail($path)
    {
        try {
            $manager = new ImageManager(new Driver());
            // read image from file system
            $image = $manager->read($path);
            // resize image proportionally to 300px width
            $image->scale(width: 300);
            $image->save($path);
        } catch (\Exception $e) {
            return false;
        }
    }

    public function updateFile($oldPath, $old_thumb_path)
    {
        if ($oldPath && Storage::disk(env('IMG_DISK'))->exists($oldPath)) {
            Storage::disk(env('IMG_DISK'))->delete($oldPath);
        }
        if ($old_thumb_path && Storage::disk(env('IMG_DISK'))->exists($old_thumb_path)) {
            Storage::disk(env('IMG_DISK'))->delete($old_thumb_path);
        }
    }

    public function deleteFile(Photo $photo)
    {
        $disk = env('IMG_DISK');
        if ($photo->img_path && Storage::disk($disk)->exists($photo->img_path) && $photo->thumb_path && Storage::disk($disk)->exists($photo->thumb_path)) {
            $fileDeleted = Storage::disk($disk)->delete($photo->img_path) && Storage::disk($disk)->delete($photo->thumb_path);

            $folderPathImg = dirname($photo->img_path);
            $folderPathThumb = dirname($photo->thumb_path);

            $filesInFolderImg = Storage::disk($disk)->files($folderPathImg);
            if (empty($filesInFolderImg)) {
                Storage::disk($disk)->deleteDirectory($folderPathImg);
            }

            $filesInFolderThumb = Storage::disk($disk)->files($folderPathThumb);
            if (empty($filesInFolderThumb)) {
                Storage::disk($disk)->deleteDirectory($folderPathThumb);
            }

            return $fileDeleted;
        }
        return false;
    }

    public function getAlbums()
    {
        return Album::OrderBy('album_name', 'asc')->get();
    }
}
