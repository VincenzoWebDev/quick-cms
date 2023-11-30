<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $photos = Photo::get();

        return $photos;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        $album = Album::find($photo)->first();
        return view(
            'admin/images/edit',
            [
                'photo' => $photo, 'album' => $album
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(int $id)
    {
        $photo = Photo::find($id);

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
        $fileName = $photo->id . '.' . $file->extension();
        $file = $file->storeAs(env('IMG_DIR'), $fileName, 'public');
        $photo->img_path = env('IMG_DIR') . $fileName;
    }

    public function deleteFile(Photo $photo)
    {
        $disk = config('filesystem.default');
        if ($photo->img_path && Storage::disk($disk)->exists($photo->img_path)) {
            return Storage::disk('public')->delete($photo->img_path);
        }
        return false;
    }
}
