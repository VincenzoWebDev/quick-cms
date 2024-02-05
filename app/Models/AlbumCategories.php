<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumCategories extends Model
{
    use HasFactory;

    protected $table = 'album_categories';

    public function albums(){
        return $this->belongsToMany(Album::class, 'album_category', 'category_id', 'album_id')->withTimestamps(); 
    }
}
