<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    public function getPathAttribute(){
        //return asset('storage/albums/' . $this->patch);
        $url = $this->album_thumb;
        if(stristr($this->album_thumb, 'http') === false){
            $url = 'storage/'. $this->album_thumb.'?v='.time();
        }
        return $url;
    }
    
    public function photos(){
        return $this->hasMany(Photo::class, 'album_id', 'id');
    }
}
