<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'album_id', 'img_path', 'thumb_path'];

    public function album()
    {
        //Specificare foreign key e id principale se non sono come messi sotto
        //return $this->belongsTo(Album::class, 'album_id', 'id');

        return $this->belongsTo(Album::class);
    }

    public function getPathAttribute()
    {
        //return asset('storage/albums/' . $this->patch);
        $url = $this->img_path;
        if (stristr($url, 'http') === false) {
            $url = 'storage/' . $url . '?v=' . time();
        }
        return $url;
    }

    public function getPhotosPercentage()
    {
        // Data di inizio e fine del mese corrente
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Data di inizio e fine del mese scorso
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Conteggio degli utenti nel mese corrente
        $currentMonthUsersCount = Photo::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        // Conteggio degli utenti nel mese scorso
        $lastMonthUsersCount = Photo::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        // Calcolo della percentuale di crescita
        if ($lastMonthUsersCount != 0) {
            $growthPercentage = (($currentMonthUsersCount - $lastMonthUsersCount) / $lastMonthUsersCount) * 100;
        } else {
            $growthPercentage = 0; // per evitare divisione per zero
        }
        return $growthPercentage;
    }
}
