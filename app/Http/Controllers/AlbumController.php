<?php

namespace App\Http\Controllers;

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

use function PHPUnit\Framework\fileExists;

class AlbumController extends Controller
{
    public function index()
    {
        $queryBuilder = Album::orderBy('id', 'desc')->withCount('photos')->where('user_id', Auth::id())->with('categories');
        $albums = $queryBuilder->paginate(env('IMG_PER_PAGE'));
        return view('admin.albums.albums', ['albums' => $albums]);
    }

    public function destroy(int $id)
    {
        $album =  Album::find($id);
        $thumbNail = $album->album_thumb;

        $res = $album->delete();

        if ($res) {
            if ($thumbNail && Storage::disk('public')->exists($thumbNail)) {
                Storage::disk('public')->delete($thumbNail);
            }
        }
        if (request()->ajax()) {
            return $res;
        } else {
            return redirect()->route('albums');
        }
    }

    public function edit(Album $album)
    {
        $this->authorize('update', $album);

        $categories = AlbumCategories::orderBy('category_name', 'asc')->where('user_id', Auth::id())->get();
        $selectedCategory = $album->categories->pluck('id')->toArray();
        return view(
            'admin.albums.edit',
            [
                'album' => $album,
                'categories' => $categories,
                'selectedCategory' => $selectedCategory
            ]
        );
    }

    public function update(EditAlbumRequest $request, $id)
    {
        $album = Album::find($id);
        $this->authorize('update', $album);

        $oldAlbumName = $album->album_name;
        $oldDescription = $album->description;
        $oldImage = $album->album_thumb;

        $album->album_name = $request->input('album_name');
        $album->description = $request->input('description');
        $album->album_thumb = $request->input('album_thumb') == null ? $oldImage : $request->input('album_thumb');
        $album->user_id = $request->user()->id;
        $catAlbum = $album->categories()->sync($request->categories);

        if ($oldAlbumName != $album->album_name || $oldDescription != $album->description || $oldImage != $album->album_thumb || $catAlbum['attached'] != null || $catAlbum['detached'] != null) {
            $this->processFile($id, $album);
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
        return view(
            'admin.albums.create',
            [
                'album' => $album,
                'categories' => $categories,
                'selectedCategory' => []
            ]
        );
    }

    public function store(AlbumRequest $request)
    {
        /*$res = Album::insert([
            'album_name' => request('album_name'),
            'description' => request('description'),
            'user_id' => User::InRandomOrder()->first()->id
        ]);*/
        $album = new Album();
        $album->album_name = $request->input('album_name');
        $album->description = $request->input('description');
        $album->album_thumb = '';
        $album->user_id = $request->user()->id;
        $res = $album->save();

        if ($res) {
            if ($request->has('categories')) {
                $album->categories()->attach($request->categories);
            }
        }
        if ($res) {
            $this->processFile($album->id, $album);
            $album->save();
        }

        $messaggio = $res ? 'Album inserito correttamente' : 'Album non inserito';
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
        $fileName = $id . '.' . $file->extension();
        $file = $file->storeAs(env('ALBUM_THUMB_DIR'), $fileName, 'public');
        $album->album_thumb = env('ALBUM_THUMB_DIR') . $fileName;
    }

    public function getPhotos($id)
    {

        $album = Album::find($id);
        $photos = Photo::where("album_id", $id)->latest()->get();
        return view('admin.images.album-images', compact('album', 'photos'));
    }
}
