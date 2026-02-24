<?php

namespace App\Http\Controllers\Admin;

use App\Models\ProductVariantValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductVariantValueController extends \App\Http\Controllers\Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'product_variant_id' => 'required',
        ], [
            'name.required' => 'Il nome valore è obbligatorio',
            'name.string' => 'Il nome valore deve essere una stringa',
            'name.max' => 'Il nome valore deve essere lungo massimo :max caratteri',
            'product_variant_id.required' => 'La variante è obbligatoria',
        ]);

        $variant_value = new ProductVariantValue();
        $variant_value->value = $request->name;
        $variant_value->product_variant_id = $request->product_variant_id;
        $res = $variant_value->save();
        if ($res) {
            Cache::tags(['products'])->flush();
        }

        $messaggio = $res ? 'Valore: ' . $variant_value->value . ' - Inserito correttamente' : 'Valore: ' . $variant_value->value . ' - Non Inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('settings.variants.index');
    }

    public function destroy(ProductVariantValue $variant_value)
    {
        $res = $variant_value->delete();
        if ($res) {
            Cache::tags(['products'])->flush();
        }
    }
}
