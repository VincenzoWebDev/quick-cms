<?php

namespace App\Http\Controllers\Admin;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends \App\Http\Controllers\Controller
{
    public function toggleSettingSwitch(Request $request, $settingId)
    {
        $setting = Setting::findOrFail($settingId);
        $active = $request->input('value');
        $setting->update(['value' => $active]);
    }

    public function index()
    {
        $settings = Setting::all();
        return Inertia::render('Admin/Settings/SettingsContent', compact('settings'));
    }

    public function create()
    {
        return Inertia::render('Admin/Settings/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'value' => 'required|string|max:255',
        ], [
            'key.required' => 'Il campo chiave è obbligatorio.',
            'key.string' => 'Il campo chiave deve essere una stringa.',
            'key.max' => 'Il campo chiave non deve superare i 255 caratteri.',
            'value.required' => 'Il campo valore è obbligatorio.',
            'value.string' => 'Il campo valore deve essere una stringa.',
            'value.max' => 'Il campo valore non deve superare i 255 caratteri.',
        ]);
        $setting = new Setting();
        $setting->key = $request->input('key');
        $setting->value = $request->input('value');
        $res = $setting->save();

        $messaggio = $res ? 'Impostazione creata con successo' : 'Errore durante la creazione dell\'impostazione';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);

        return redirect()->route('settings.index');
    }

    public function edit(Setting $setting)
    {
        return Inertia::render('Admin/Settings/Edit', compact('setting'));
    }

    public function update(Setting $setting, Request $request)
    {
        $request->validate([
            'key' => 'required|string|max:255',
            'value' => 'required|string|max:255',
        ], [
            'key.required' => 'Il campo chiave è obbligatorio.',
            'key.string' => 'Il campo chiave deve essere una stringa.',
            'key.max' => 'Il campo chiave non deve superare i 255 caratteri.',
            'value.required' => 'Il campo valore è obbligatorio.',
            'value.string' => 'Il campo valore deve essere una stringa.',
            'value.max' => 'Il campo valore non deve superare i 255 caratteri.',
        ]);
        $setting->key = $request->input('key');
        $setting->value = $request->input('value');
        $res = $setting->save();

        $messaggio = $res ? 'Impostazione aggiornata con successo' : 'Errore durante l\'aggiornamento dell\'impostazione';
        $tipoMessaggio = $res ? 'success' : 'danger';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return redirect()->route('settings.index');
    }

    public function destroy(Setting $setting)
    {
        if ($setting->key === 'ecommerce_status') {
            $messaggio = 'Non è possibile eliminare l\'impostazione "ecommerce_status".';
            $tipoMessaggio = 'danger';
            session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
            return;
        }
        $setting->delete();
        $messaggio = 'Impostazione eliminata con successo';
        $tipoMessaggio = 'success';
        session()->flash('message', ['tipo' => $tipoMessaggio, 'testo' => $messaggio]);
        return;
    }
}
