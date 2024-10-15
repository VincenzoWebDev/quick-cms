<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumCategories extends Model
{
    use HasFactory;

    protected $table = 'album_categories';

    public function albums()
    {
        return $this->belongsToMany(Album::class, 'album_category', 'category_id', 'album_id')->withTimestamps();
    }

    public function users(){
        return $this->belongsToMany(User::class, 'album_category', 'category_id', 'user_id')->withTimestamps();
    }
}
