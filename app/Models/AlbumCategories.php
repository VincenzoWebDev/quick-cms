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

    public function getCategoriesPercentage()
    {
        // Data di inizio e fine del mese corrente
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Data di inizio e fine del mese scorso
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Conteggio degli utenti nel mese corrente
        $currentMonthUsersCount = AlbumCategories::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        // Conteggio degli utenti nel mese scorso
        $lastMonthUsersCount = AlbumCategories::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        // Calcolo della percentuale di crescita
        if ($lastMonthUsersCount != 0) {
            $growthPercentage = (($currentMonthUsersCount - $lastMonthUsersCount) / $lastMonthUsersCount) * 100;
        } else {
            $growthPercentage = 0; // per evitare divisione per zero
        }
        return $growthPercentage;
    }
}
