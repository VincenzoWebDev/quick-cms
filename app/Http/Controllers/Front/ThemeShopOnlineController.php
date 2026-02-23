<?php

namespace App\Http\Controllers\Front;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ThemeShopOnlineController extends Controller
{
    /**
     * Mostra la home del tema shoponline.
     */
    public function index(): Response
    {
        return Inertia::render('Front/Themes/shoponline/HomeComponent', [
            'title' => 'Shop Online - Demo',
        ]);
    }

    /** Lista prodotti demo */
    public function products(): Response
    {
        $products = $this->sampleProducts();

        return Inertia::render('Front/Themes/shoponline/Products', [
            'products' => $products,
        ]);
    }

    /** Pagina dettaglio prodotto demo */
    public function product(int $id): Response
    {
        $products = $this->sampleProducts();
        $product = collect($products)->firstWhere('id', $id);

        if (! $product) {
            abort(404);
        }

        return Inertia::render('Front/Themes/shoponline/Product', [
            'product' => $product,
        ]);
    }

    /** Pagina compare: accetta query param `ids=1,2,3` */
    public function compare(Request $request): Response
    {
        $ids = $request->query('ids', '');
        $idsArray = array_filter(explode(',', $ids), fn($v) => is_numeric($v));

        $products = $this->sampleProducts();

        if (count($idsArray) > 0) {
            $selected = array_values(array_filter($products, fn($p) => in_array($p['id'], array_map('intval', $idsArray))));
        } else {
            $selected = [];
        }

        return Inertia::render('Front/Themes/shoponline/Compare', [
            'products' => $selected,
        ]);
    }

    /** Prodotti di esempio con specifiche per il confronto */
    private function sampleProducts(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'Auricolari Wireless X1',
                'price' => '29.99',
                'specs' => [
                    'Peso' => '8 g',
                    'Batteria' => '24h',
                    'Colore' => 'Nero',
                ],
            ],
            [
                'id' => 2,
                'title' => 'Speaker Portatile S2',
                'price' => '49.90',
                'specs' => [
                    'Peso' => '400 g',
                    'Batteria' => '12h',
                    'Colore' => 'Grigio',
                ],
            ],
            [
                'id' => 3,
                'title' => 'Powerbank P10',
                'price' => '19.50',
                'specs' => [
                    'Peso' => '220 g',
                    'Batteria' => '10000 mAh',
                    'Colore' => 'Bianco',
                ],
            ],
        ];
    }
}
