<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlbumCategory extends Model
{
    use HasFactory;

    protected $table = 'Album_category';

    public function users(){
        $this->belongsTo(User::class);
    }

}
