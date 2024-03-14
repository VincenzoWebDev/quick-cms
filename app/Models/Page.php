<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'meta_title', 'active', 'slug', 'content', 'layout_id', 'meta_description', 'published_at'];

    public function layout()
    {
        return $this->belongsTo(PageLayout::class, 'layout_id');
    }
}
