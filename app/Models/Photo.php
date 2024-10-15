<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'album_id', 'img_path', 'thumb_path'];

    public function album()
    {
        //Specificare foreign key e id principale se non sono come messi sotto
        //return $this->belongsTo(Album::class, 'album_id', 'id');

        return $this->belongsTo(Album::class);
    }

    public function getPathAttribute()
    {
        //return asset('storage/albums/' . $this->patch);
        $url = $this->img_path;
        if (stristr($url, 'http') === false) {
            $url = 'storage/' . $url . '?v=' . time();
        }
        return $url;
    }
}
