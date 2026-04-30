<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'path',
        'type',
        'description',
        'parent_theme_id',
        'status',
        'manifest_path',
        'has_scaffold',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
        'has_scaffold' => 'boolean',
    ];

    public function parentTheme()
    {
        return $this->belongsTo(self::class, 'parent_theme_id');
    }

    public function childThemes()
    {
        return $this->hasMany(self::class, 'parent_theme_id');
    }
}
