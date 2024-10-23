<?php

namespace App\Http\Controllers\Admin;

use App\Models\Album;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function destroy(Photo $photo)
    {
        if (!$photo) {
            return false;
        }
        $res = $photo->delete();
        if ($res) {
            $this->deleteFile($photo);
        }
    }

    public function destroyBatch(Request $request)
    {
        $recordIds = $request->input('recordIds');
        if ($recordIds == null) {
            return;
        }
        foreach ($recordIds as $recordId) {
            $photo = Photo::findOrFail($recordId);
            $res = $photo->delete();
            if ($res) {
                $this->deleteFile($photo);
            }
        }
    }

    public function deleteFile($photo)
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
}
