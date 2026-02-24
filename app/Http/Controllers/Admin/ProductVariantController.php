<?php

namespace App\Http\Controllers\Admin;

use App\Models\ProductVariant;
use App\Models\ProductVariantValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ProductVariantController extends \App\Http\Controllers\Controller
{
    public function index()
    {
        $variants = ProductVariant::all();
        $variants_values = ProductVariantValue::all();
        return Inertia::render('Admin/Settings/ProductVariants/ProductVariantsContent', [
            'variants' => $variants,
            'variants_values' => $variants_values,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ], [
            'name.required' => 'Il nome è obbligatorio',
            'name.string' => 'Il nome deve essere una stringa',
            'name.max' => 'Il nome deve essere lungo massimo :max caratteri',
        ]);

        $variant = new ProductVariant();
        $variant->name = $request->name;
        $res = $variant->save();
        if ($res) {
            Cache::tags(['products'])->flush();
        }

        $messaggio = $res ? 'Variante: ' . $variant->name . ' - Inserita correttamente' : 'Variante: ' . $variant->name . ' - Non Inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('settings.variants.index');
    }

    public function update(Request $request, ProductVariant $variant)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ], [
            'name.required' => 'Il nome è obbligatorio',
            'name.string' => 'Il nome deve essere una stringa',
            'name.max' => 'Il nome deve essere lungo massimo :max caratteri',
        ]);

        $oldName = $variant->name;
        $variant->name = $request->input('name');

        if ($oldName !== $variant->name) {
            $res = $variant->save();
        } else {
            $res = 0;
        }
        if ($res) {
            Cache::tags(['products'])->flush();
        }
        $messaggio = $res ? 'Variante: ' . $variant->name . ' - Modificata correttamente' : 'Variante: ' . $variant->name . ' - Non Modificata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('settings.variants.index');
    }

    public function destroy(ProductVariant $variant)
    {
        $res = $variant->delete();
        if ($res) {
            Cache::tags(['products'])->flush();
        }
    }
}
