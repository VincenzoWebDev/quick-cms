<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'email',
        'password',
        'role',
        'profile_img',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    public function albumCategories()
    {
        return $this->hasMany(AlbumCategories::class);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function getProfileImgAttribute($value)
    {
        $url = $value;
        if(empty($url)){
            $url = 'https://via.placeholder.com/150';
        }else{
            $url = config('app.url') . '/storage/' . $url . '?v=' . time();
        }
        return $url;
    }

    public function getUserAlbumCatDataChart()
    {
        // Ottieni l'anno corrente
        $currentYear = Carbon::now()->year;

        // Ottieni i dati degli utenti registrati per ogni mese dell'anno corrente
        $userCountData = DB::table('users')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as userCount'))
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

        // Ottieni i dati degli album creati per ogni mese dell'anno corrente
        $albumCountData = DB::table('albums')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as albumCount'))
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

        $categoriesData = DB::table('album_categories')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as categoryCount'))
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

        $photoData = DB::table('photos')
            ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as categoryCount'))
            ->whereYear('created_at', $currentYear)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->get();

        // Unisci i dati degli utenti e degli album per ogni mese
        $monthData = collect(range(1, 12))->map(function ($month) use ($userCountData, $albumCountData, $categoriesData, $photoData) {
            $userCount = $userCountData->firstWhere('month', $month);
            $albumCount = $albumCountData->firstWhere('month', $month);
            $categoryCount = $categoriesData->firstWhere('month', $month);
            $photoCount = $photoData->firstWhere('month', $month);
            return [
                'month' => $month,
                'userCount' => $userCount ? $userCount->userCount : 0,
                'albumCount' => $albumCount ? $albumCount->albumCount : 0,
                'categoryCount' => $categoryCount ? $categoryCount->categoryCount : 0,
                'photoCount' => $photoCount ? $photoCount->categoryCount : 0
            ];
        });

        return $monthData;
    }

    public function getUsersPercentage()
    {
        // Data di inizio e fine del mese corrente
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Data di inizio e fine del mese scorso
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Conteggio degli utenti nel mese corrente
        $currentMonthUsersCount = User::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        // Conteggio degli utenti nel mese scorso
        $lastMonthUsersCount = User::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();

        // Calcolo della percentuale di crescita
        if ($lastMonthUsersCount != 0) {
            $growthPercentage = (($currentMonthUsersCount - $lastMonthUsersCount) / $lastMonthUsersCount) * 100;
        } else {
            $growthPercentage = 0; // per evitare divisione per zero
        }
        return $growthPercentage;
    }
}
