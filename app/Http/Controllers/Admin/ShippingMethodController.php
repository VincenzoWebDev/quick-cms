<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EditShippingMethodRequest;
use App\Http\Requests\ShippingMethodRequest;
use App\Models\ShippingMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShippingMethodController extends \App\Http\Controllers\Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shippingMethods = ShippingMethod::all();
        return Inertia::render('Admin/ShippingMethod/ShippingMethodContent', [
            'shippingMethods' => $shippingMethods
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ShippingMethod/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ShippingMethodRequest $request)
    {
        $shippingMethod = new ShippingMethod();
        $shippingMethod->name = $request->name;
        $shippingMethod->description = $request->description;
        $shippingMethod->price = $request->price;
        $shippingMethod->delivery_time = $request->delivery_time;
        $res = $shippingMethod->save();

        $messaggio = $res ? 'Spedizione ID : ' . $shippingMethod->id . ' - Inserita correttamente' : 'Spedizione ID : ' . $shippingMethod->id . ' - Non Inserita';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('shipping-methods.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ShippingMethod $shippingMethod)
    {
        return Inertia::render('Admin/ShippingMethod/Edit', [
            'shippingMethod' => $shippingMethod
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditShippingMethodRequest $request, ShippingMethod $shippingMethod)
    {
        $oldName = $shippingMethod->name;
        $oldDescription = $shippingMethod->description;
        $oldPrice = $shippingMethod->price;
        $oldDeliveryTime = $shippingMethod->delivery_time;

        $shippingMethod->name = $request->input('name');
        $shippingMethod->description = $request->input('description');
        $shippingMethod->price = $request->input('price');
        $shippingMethod->delivery_time = $request->input('delivery_time');

        if ($oldName != $shippingMethod->name || $oldDescription != $shippingMethod->description || $oldPrice != $shippingMethod->price || $oldDeliveryTime != $shippingMethod->delivery_time) {
            $res = $shippingMethod->save();
        } else {
            $res = 0;
        }
        $messaggio = $res ? 'Spedizione ID : ' . $shippingMethod->id . ' - Aggiornata correttamente' : 'Spedizione ID : ' . $shippingMethod->id . ' - Non aggiornata';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('shipping-methods.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShippingMethod $shippingMethod)
    {
        $shippingMethod ? $shippingMethod->delete() : null;
    }
}
