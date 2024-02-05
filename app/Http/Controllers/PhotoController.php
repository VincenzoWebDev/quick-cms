<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Photo::class);
    }

    protected $rules = [
        'name' => 'required',
        'description' => 'required',
        'album_id' => 'required|exists:albums,id',
        'img_path' => 'required|image'
    ];

    public function index()
    {
        $photos = Photo::orderBy('id', 'desc')->paginate(env('IMG_PER_PAGE'));

        return view(
            'admin.images.photos',
            [
                "photos" => $photos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $photo = new Photo;
        $albums = $this->getAlbums()->where('user_id', Auth::user()->id);
        return view(
            'admin.images.create',
            [
                'photo' => $photo,
                'albums' => $albums
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request, $this->rules);

        $photo = new Photo();
        $photo->name = $request->input('name');
        $photo->description = $request->input('description');
        $photo->album_id = $request->album_id;
        $photo->img_path = '';
        $res = $photo->save();

        if ($res) {
            $this->processFile($photo);
            $photo->save();
        }

        $messaggio = $res ? 'Immagine inserita correttamente' : 'Immagine non inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('albums.photos', $photo->album_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Photo $photo)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Photo $photo)
    {
        $albums = $this->getAlbums()->where('user_id', Auth::user()->id);
        return view(
            'admin.images.edit',
            [
                'photo' => $photo,
                'albums' => $albums
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Photo $photo)
    {
        $oldName = $photo->name;
        $oldDescription = $photo->description;
        $oldPath = $photo->img_path;

        array_pop($this->rules);
        $this->validate($request, $this->rules);
        $photo->name = $request->input('name');
        $photo->description = $request->input('description');
        $photo->album_id = $request->album_id;
        $photo->img_path = $request->input('img_path') == null ? $oldPath : $request->input('img_path');
        $this->processFile($photo);

        if ($oldName != $photo->name || $oldDescription != $photo->description || $oldPath != $photo->img_path) {
            $res = $photo->save();
        } else {
            $res = 0;
        }

        $messaggio = $res ? 'Immagine ID : ' . $photo->id . ' - Aggiornata correttamente' : 'Immagine ID : ' . $photo->id . ' - Non aggiornata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('albums.photos', $photo->album_id);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Photo $photo)
    {
        $photo = Photo::find($photo->id);

        if (!$photo) {
            return response()->json(['error' => 'Foto non trovata'], 404);
        }
        $res = $photo->delete();
        if ($res) {
            $this->deleteFile($photo);
        }
        return $res;
    }

    public function processFile(Photo $photo)
    {
        if (!request()->hasFile('img_path')) {
            return false;
        }
        $file = request()->file('img_path');

        if (!$file->isValid()) {
            return false;
        }
        $originalName = $photo->name;
        $imgName = str_replace(' ', '_', $originalName);
        $extension = $file->extension();

        $counter = 1;
        $fileName = $imgName . '.' . $extension;

        // Verifica se il file esiste già
        while (Storage::disk('public')->exists(env('IMG_DIR') .'/'. $photo->album_id . '/' . $fileName)) {
            $fileName = $imgName . '_' . $counter . '.' . $extension;
            $counter++;
        }

        $file = $file->storeAs(env('IMG_DIR') . '/' . $photo->album_id, $fileName, 'public');
        $photo->img_path = env('IMG_DIR') . $photo->album_id . '/' . $fileName;
    }


    public function deleteFile(Photo $photo)
    {
        $disk = config('filesystem.default');
        if ($photo->img_path && Storage::disk($disk)->exists($photo->img_path)) {
            return Storage::disk('public')->delete($photo->img_path);
        }
        return false;
    }

    public function getAlbums()
    {
        return Album::OrderBy('album_name', 'asc')->get();
    }
    
}
