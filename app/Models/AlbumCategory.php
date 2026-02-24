<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumCategory extends Model
{
    use HasFactory;

    protected $table = 'album_categories';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
