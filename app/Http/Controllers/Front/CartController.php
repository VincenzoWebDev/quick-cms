<?php

namespace App\Http\Controllers\Front;

use App\Http\Requests\CartRequest;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends \App\Http\Controllers\Controller
{
    protected $themeName;

    public function __construct()
    {
        $this->themeName = $this->getActiveTheme();
    }

    public function addToCart(CartRequest $request)
    {
        $user = Auth::user();
        if (!$user) {
            $messaggio = 'Devi essere loggato per aggiungere un prodotto al carrello';
            $tipoMessaggio = 'danger';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        }
        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->where('combination_id', $request->combination_id)
            ->first();
        if ($cartItem) {
            // Se esiste, aggiorna la quantità
            if ($cartItem->quantity >= $request->max_quantity || $request->quantity > $request->max_quantity || $cartItem->quantity + $request->quantity > $request->max_quantity) {
                $messaggio = 'La quantità massima è ' . $request->max_quantity;
                $tipoMessaggio = 'danger';
                session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
            } else {
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            }
        } else {
            if ($request->quantity > $request->max_quantity) {
                $messaggio = 'La quantità massima è ' . $request->max_quantity;
                $tipoMessaggio = 'danger';
                session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
            } else {
                // Se non esiste, crea un nuovo articolo nel carrello
                // Altrimenti, crea un nuovo articolo nel carrello
                $cartItem = new CartItem();
                $cartItem->user_id = $user->id;
                $cartItem->product_id = $request->product_id;
                $cartItem->price = $request->price;
                $cartItem->quantity = $request->quantity;
                $cartItem->combination_id = $request->combination_id;
                $cartItem->save();
            }
        }
    }

    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)
            ->with('product', 'VariantCombination.variantCombinationValues.productVariantValue')
            ->get();
        return Inertia::render('Front/Themes/' . $this->themeName . '/Cart', compact('cartItems'));
    }

    public function deleteCartItem($id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $cartItem->delete();
        }
    }
}
