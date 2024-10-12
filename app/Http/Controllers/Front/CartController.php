<?php

namespace App\Http\Controllers\Front;

use App\Http\Requests\CartRequest;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends \App\Http\Controllers\Controller
{
    public function addToCart(CartRequest $request)
    {
        $user = Auth::user();
        if (!$user) {
            $messaggio = 'Devi essere loggato per aggiungere un prodotto al carrello';
            $tipoMessaggio = 'danger';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
            return redirect()->route('front.user.login');
        }
        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->where('color', $request->color)
            ->where('size', $request->size)
            ->first();

        if ($cartItem) {
            // Se esiste, aggiorna la quantità
            if ($cartItem->quantity >= $request->max_quantity) {
                $messaggio = 'La quantità massima è ' . $request->max_quantity;
                $tipoMessaggio = 'danger';
                session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
                return redirect()->route('cart.index');
            } else {
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
            }
        } else {
            // Altrimenti, crea un nuovo articolo nel carrello
            $cartItem = new CartItem();
            $cartItem->user_id = $user->id;
            $cartItem->product_id = $request->product_id;
            $cartItem->price = $request->price;
            $cartItem->color = $request->color;
            $cartItem->size = $request->size;
            $cartItem->quantity = $request->quantity;
            $cartItem->save();
        }
    }

    public function index()
    {
        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)->with('product')->get();
        return Inertia::render('Front/Cart', compact('cartItems'));
    }

    public function deleteCartItem($id)
    {
        $cartItem = CartItem::find($id);
        if ($cartItem) {
            $cartItem->delete();
        }
    }
}
