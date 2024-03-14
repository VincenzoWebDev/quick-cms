<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\AlbumRequest;
use App\Http\Requests\EditAlbumRequest;
use App\Models\Album;
use App\Models\AlbumCategories;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class AlbumController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        $albums = Album::orderBy('id', 'desc')
            ->withCount('photos')
            ->where('user_id', Auth::id())
            ->with(['categories', 'user']) // Carica anche la relazione dell'utente
            ->paginate(env('IMG_PER_PAGE'));
        return Inertia::render('Admin/Albums/AlbumsContent', ['albums' => $albums]);
    }

    public function destroy(Album $album)
    {
        $thumbNail = $album->album_thumb;
        if ($album->photos->count() > 0) {
            $this->deleteImages($album);
        }
        if ($album->categories->count() > 0) {
            $album->categories()->detach();
        }
        $res = $album->delete();

        if ($res && $thumbNail) {
            // Costruisci il percorso completo del file utilizzando il nome del file
            $thumbPath = public_path('storage/' . $thumbNail);
            $folderPathThumb = dirname($album->album_thumb);
            // Verifica se l'immagine esiste prima di eliminarla
            if (file_exists($thumbPath)) {
                unlink($thumbPath); // Elimina l'immagine dal filesystem
                if (empty(Storage::disk(env('IMG_DISK'))->files($folderPathThumb))) {
                    Storage::disk(env('IMG_DISK'))->deleteDirectory($folderPathThumb);
                }
            }
        }
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        foreach ($recordIds as $recordId) {
            $album = Album::findOrFail($recordId);
            if ($album->photos->count() > 0) {
                $this->deleteImages($album);
            }
            if ($album->categories->count() > 0) {
                $album->categories()->detach();
            }
            $res = Album::where('id', $recordId)->delete();
            $thumbNail = $album->album_thumb;
            if ($res && $thumbNail) {
                // Costruisci il percorso completo del file utilizzando il nome del file
                $thumbPath = public_path('storage/' . $thumbNail);
                $folderPathThumb = dirname($album->album_thumb);
                // Verifica se l'immagine esiste prima di eliminarla
                if (file_exists($thumbPath) && $thumbNail != null) {
                    unlink($thumbPath); // Elimina l'immagine dal filesystem
                    if (empty(Storage::disk(env('IMG_DISK'))->files($folderPathThumb))) {
                        Storage::disk(env('IMG_DISK'))->deleteDirectory($folderPathThumb);
                    }
                }
            }
        }
    }

    public function deleteImages(Album $album)
    {
        $photos = Photo::where('album_id', $album->id)->get();
        $disk = env('IMG_DISK');
        foreach ($photos as $photo) {
            if ($photo->img_path && Storage::disk($disk)->exists($photo->img_path) && $photo->thumb_path && Storage::disk($disk)->exists($photo->thumb_path)) {

                Storage::disk($disk)->delete($photo->img_path) && Storage::disk($disk)->delete($photo->thumb_path);

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
            }
        }
    }

    public function edit(Album $album)
    {
        $this->authorize('update', $album);

        $categories = AlbumCategories::orderBy('category_name', 'asc')->where('user_id', Auth::id())->get();
        $selectedCategory = $album->categories->pluck('id')->toArray();

        return Inertia::render('Admin/Albums/Edit', [
            'album' => $album,
            'categories' => $categories,
            'selectedCategory' => $selectedCategory
        ]);
    }

    public function update(EditAlbumRequest $request, $id)
    {

        $album = Album::findOrFail($id);

        $this->authorize('update', $album);

        $oldAlbumName = $album->album_name;
        $oldDescription = $album->description;
        $oldImage = $album->album_thumb;

        $album->album_name = $request->input('album_name');
        $album->description = $request->input('description');
        $album->album_thumb = $request->input('album_thumb') == null ? $oldImage : $request->input('album_thumb');
        $album->user_id = $request->user()->id;
        $catAlbum = $album->categories()->sync($request->categories);


        if ($oldAlbumName != $album->album_name || $oldDescription != $album->description || $oldImage != $album->album_thumb || $catAlbum['attached'] != null || $catAlbum['detached'] != null || $request->hasFile('album_thumb')) {
            if ($oldImage) {
                Storage::delete($oldImage);
            }
            $this->processFile($album->id, $album);
            $res = $album->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Album ID : ' . $id . ' - Aggiornato correttamente' : 'Album ID : ' . $id . ' - Non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('albums');
    }

    public function create()
    {
        $album = new Album;
        $categories = AlbumCategories::orderBy('category_name', 'asc')->where('user_id', Auth::id())->get();

        return Inertia::render('Admin/Albums/Create', [
            'album' => $album,
            'categories' => $categories,
            'selectedCategory' => []
        ]);
    }

    public function store(AlbumRequest $request)
    {
        $album = new Album();
        $album->album_name = $request->input('album_name');
        $album->description = $request->input('description');
        $album->album_thumb = '';
        $album->user_id = $request->user()->id;
        $res = $album->save();

        if ($res) {
            if ($request->has('categories') > 0) {
                $album->categories()->attach($request->categories);
            }
        }

        if ($res) {
            $this->processFile($album->id, $album);
            $album->save(); // Salva nuovamente l'album dopo il caricamento del file
        }

        $messaggio = $res ? 'Album ' . $album->id . ' inserito correttamente' : 'Album ' . $album->id . ' non inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('albums');
    }


    public function processFile($id, &$album)
    {
        if (!request()->hasFile('album_thumb')) {
            return false;
        }
        $file = request()->file('album_thumb');
        if (!$file->isValid()) {
            return false;
        }
        $albumName = str_replace(' ', '_', $album->album_name);
        $fileName = $albumName . '_' . $id . '.' . $file->extension();
        $dirAlbumId = 'album_' . $album->id;
        $file = $file->storeAs('public/' . env('ALBUM_THUMB_DIR') . $dirAlbumId, $fileName);
        $filePath = public_path('storage/' . env('ALBUM_THUMB_DIR') . $dirAlbumId . '/' . $fileName);
        $this->createThumbnail($filePath);
        $album->album_thumb = env('ALBUM_THUMB_DIR') . $dirAlbumId . '/' . $fileName;
    }

    public function createThumbnail($filePath)
    {
        try {
            $manager = new ImageManager(new Driver());
            $image = $manager->read($filePath);
            // resize image proportionally to 300px width
            $image->scale(width: 300);
            $image->save($filePath);
        } catch (\Exception $e) {
            return false;
        }
    }

    public function getPhotos($id)
    {

        $album = Album::find($id);
        $photos = Photo::where("album_id", $id)->latest()->get();
        // return view('admin.images.album-images', compact('album', 'photos'));

        return Inertia::render('Admin/Photos/AlbumPhotosContent', [
            'album' => $album,
            'photos' => $photos
        ]);
    }
}
