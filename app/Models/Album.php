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
        if(stristr($url, 'http') === false){
            $url = 'storage/'. $url.'?v='.time();
        }
        return $url;
    }
    
    public function photos(){
        return $this->hasMany(Photo::class, 'album_id', 'id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function categories(){
        return $this->belongsToMany(AlbumCategories::class, 'album_category', 'album_id', 'category_id')->withTimestamps();
    }
}
