<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\fileExists;

class AlbumController extends Controller
{
    public function index()
    {
        $queryBuilder = Album::orderBy('id', 'desc')->withCount('photos');
        $albums = $queryBuilder->paginate(10);
        return view('admin.albums.albums', ['albums' => $albums]);
    }

    public function delete(int $id)
    {
        $album =  Album::find($id);
        $thumbNail = $album->album_thumb;

        $res = $album->delete();

        if ($res) {
            if ($thumbNail && Storage::disk('public')->exists($thumbNail)) {
                Storage::disk('public')->delete($thumbNail);
            }
        }
        return $res;
    }

    public function edit($id)
    {
        $album = Album::find($id);

        return view('admin/albums/edit', ['album' => $album]);
    }

    public function store($id)
    {
        $album = Album::find($id);

        $oldAlbumName = $album->album_name;
        $oldDescription = $album->description;
        $oldImage = $album->album_thumb;

        $album->album_name = request('album_name');
        $album->description = request('description');
        $album->album_thumb = request('album_thumb') == null ? $oldImage : request('album_thumb');

        if ($oldAlbumName != $album->album_name || $oldDescription != $album->description || $oldImage != $album->album_thumb) {
            $this->processFile($id, $album);
            $res = $album->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Album ID : ' . $id . ' - aggiornato correttamente' : 'Album ID : ' . $id . ' - non aggiornato';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('albums');
    }

    public function create()
    {
        return view('admin.albums.create');
    }

    public function save()
    {
        /*$res = Album::insert([
            'album_name' => request('album_name'),
            'description' => request('description'),
            'user_id' => User::InRandomOrder()->first()->id
        ]);*/
        $album = new Album();
        $album->album_name = request('album_name');
        $album->description = request('description');
        $album->album_thumb = '';
        $album->user_id = User::InRandomOrder()->first()->id;
        $res = $album->save();

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

    public function getPhotos($id){

        $album = Album::find($id);
        $photos = Photo::where("album_id", $id)->get();
        return view('admin.images.album-images', compact('album', 'photos'));
    }
}
