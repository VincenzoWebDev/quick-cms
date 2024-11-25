<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CartRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ];
    }
    public function messages()
    {
        return [
            'product_id.required' => 'Il prodotto è obbligatorio',
            'product_id.exists' => 'Il prodotto non esiste',
            'quantity.required' => 'La quantità è obbligatoria',
            'quantity.integer' => 'La quantità deve essere un numero intero',
            'quantity.min' => 'La quantità deve essere almeno 1',
        ];
    }
}
