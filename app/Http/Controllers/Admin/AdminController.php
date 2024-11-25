<?php

namespace App\Http\Controllers\Admin;

use App\Models\Album;
use App\Models\AlbumCategories;
use App\Models\Notification;
use App\Models\Order;
use App\Models\Photo;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends \App\Http\Controllers\Controller
{

    public function markAsRead(Notification $notificationId)
    {
        $notificationId->markAsRead();
    }

    public function index()
    {

        $users = User::orderBy('id', 'desc')->get();
        $albums = Album::all();
        $products = Product::all();
        $orders = Order::all();
        // istanzo le classi per prendere i metodi che mi servono per i grafici
        $usersData = new User();
        $albumsData = new Album();
        $productsData = new Product();
        $ordersData = new Order();
        $dataChart = $this->getDataChart();
        $usersPercentage = $usersData->getUsersPercentage();
        $albumsPercentage = $albumsData->getAlbumsPercentage();
        $productsPercentage = $productsData->getProductsPercentage();
        $ordersPercentage = $ordersData->getOrdersPercentage();

        return Inertia::render('Admin/Home', [
            'users' => $users,
            'albums' => $albums,
            'products' => $products,
            'orders' => $orders,
            'dataChart' => $dataChart,
            'usersPercentage' => $usersPercentage,
            'albumsPercentage' => $albumsPercentage,
            'productsPercentage' => $productsPercentage,
            'ordersPercentage' => $ordersPercentage,
        ]);
    }

    public function getDataChart()
    {
        $dbDriver = DB::getDriverName();

        // Ottieni l'anno corrente
        $currentYear = Carbon::now()->year;

        if ($dbDriver === 'mysql') {
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

            $productCountData = DB::table('products')
                ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as productCount'))
                ->whereYear('created_at', $currentYear)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->get();

            $orderCountData = DB::table('orders')
                ->select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as orderCount'))
                ->whereYear('created_at', $currentYear)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->get();
        } elseif ($dbDriver === 'pgsql') {
            $userCountData = DB::table('users')
                ->select(DB::raw('EXTRACT(MONTH FROM created_at) as month'), DB::raw('COUNT(*) as userCount'))
                ->whereYear('created_at', $currentYear)
                ->groupBy(DB::raw('EXTRACT(MONTH FROM created_at)'))
                ->get();

            $albumCountData = DB::table('albums')
                ->select(DB::raw('EXTRACT(MONTH FROM created_at) as month'), DB::raw('COUNT(*) as albumCount'))
                ->whereYear('created_at', $currentYear)
                ->groupBy(DB::raw('EXTRACT(MONTH FROM created_at)'))
                ->get();

            $productCountData = DB::table('products')
                ->select(DB::raw('EXTRACT(MONTH FROM created_at) as month'), DB::raw('COUNT(*) as productCount'))
                ->whereYear('created_at', $currentYear)
                ->groupBy(DB::raw('EXTRACT(MONTH FROM created_at)'))
                ->get();

            $orderCountData = DB::table('orders')
                ->select(DB::raw('EXTRACT(MONTH FROM created_at) as month'), DB::raw('COUNT(*) as orderCount'))
                ->whereYear('created_at', $currentYear)
                ->groupBy(DB::raw('EXTRACT(MONTH FROM created_at)'))
                ->get();
        }

        // Unisci i dati degli utenti e degli album per ogni mese
        $monthData = collect(range(1, 12))->map(function ($month) use ($userCountData, $albumCountData, $productCountData, $orderCountData) {
            // Trova i conteggi per il mese specifico
            $userCount = $userCountData->firstWhere('month', $month);
            $albumCount = $albumCountData->firstWhere('month', $month);
            $productCount = $productCountData->firstWhere('month', $month);
            $orderCount = $orderCountData->firstWhere('month', $month);

            return [
                'month' => $month,
                'userCount' => $userCount ? ($userCount->userCount ?? 0) : 0,
                'albumCount' => $albumCount ? ($albumCount->albumCount ?? 0) : 0,
                'productCount' => $productCount ? ($productCount->productCount ?? 0) : 0,
                'orderCount' => $orderCount ? ($orderCount->orderCount ?? 0) : 0,
            ];
        });

        return $monthData;
    }
}
