<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Album extends Model
{
    use HasFactory;

    protected $fillable = ['album_name', 'description', 'album_thumb', 'user_id'];

    public function getPathAttribute()
    {
        //return asset('storage/albums/' . $this->patch);
        $url = $this->album_thumb;
        if (stristr($url, 'http') === false) {
            $url = 'storage/' . $url . '?v=' . time();
        }
        return $url;
    }

    public function photos()
    {
        return $this->hasMany(Photo::class, 'album_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(AlbumCategories::class, 'album_category', 'album_id', 'category_id')->withTimestamps();
    }

    public function getAlbumsPercentage()
    {
        // Data di inizio e fine del mese corrente
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Data di inizio e fine del mese scorso
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Conteggio degli utenti nel mese corrente
        $currentMonthUsersCount = Album::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        // Conteggio degli utenti nel mese scorso
        $lastMonthUsersCount = Album::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        // Calcolo della percentuale di crescita
        if ($lastMonthUsersCount != 0) {
            $growthPercentage = (($currentMonthUsersCount - $lastMonthUsersCount) / $lastMonthUsersCount) * 100;
        } else {
            $growthPercentage = 0; // per evitare divisione per zero
        }
        return $growthPercentage;
    }
}
