<?php

namespace App\Http\Controllers\Admin;

use App\Models\ProductVariant;
use App\Models\ProductVariantValue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductVariantValueController extends \App\Http\Controllers\Controller
{
    public function create()
    {
        $product_variants = ProductVariant::all();
        return Inertia::render('Admin/Settings/ProductVariantValues/Create', [
            'product_variants' => $product_variants,
        ]);
    }

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

        $messaggio = $res ? 'Valore: ' . $variant_value->value . ' - Inserito correttamente' : 'Valore: ' . $variant_value->value . ' - Non Inserito';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('settings.variants.index');
    }

    public function edit(ProductVariantValue $variant_value) {}

    public function destroy(ProductVariantValue $variant_value)
    {
        $variant_value->delete();
    }
}
