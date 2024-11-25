<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingMethodRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'price' => 'required|numeric',
            'delivery_time' => 'required|numeric',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Il campo nome è obbligatorio.',
            'name.string' => 'Il campo nome deve essere una stringa.',
            'name.max' => 'Il campo nome non deve superare i 255 caratteri.',
            'description.string' => 'Il campo descrizione deve essere una stringa.',
            'description.max' => 'Il campo descrizione non deve superare i 255 caratteri.',
            'price.required' => 'Il campo prezzo è obbligatorio.',
            'price.numeric' => 'Il campo prezzo deve essere un numero.',
            'delivery_time.required' => 'Il campo tempo di consegna è obbligatorio.',
            'delivery_time.string' => 'Il campo tempo di consegna deve essere un numero.',
        ];
    }
}
