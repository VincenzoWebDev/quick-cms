<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    /*public function album(){
        return $this->belongsTo(Album::class);
    }*/

    public function getPathAttribute()
    {
        //return asset('storage/albums/' . $this->patch);
        $url = $this->img_path;
        if (stristr($this->img_path, 'http') === false) {
            $url = 'storage/' . $this->img_path . '?v=' . time();
        }
        return $url;
    }
}
