<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
            'name' => 'required',
            'lastname' => 'required',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'address' => 'required',
            'civic' => 'required',
            'province' => 'required',
            'city' => 'required',
            'cap' => 'required',
            'shipping_method_id' => 'required',
            'total_price' => 'required',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Il nome è obbligatorio',
            'lastname.required' => 'Il cognome è obbligatorio',
            'email.required' => 'L\'email è obbligatoria',
            'email.email' => 'L\'email non è valida',
            'phone.required' => 'Il numero di telefono è obbligatorio',
            'phone.numeric' => 'Il numero di telefono deve essere numerico',
            'address.required' => 'L\'indirizzo è obbligatorio',
            'civic.required' => 'Il numero civico è obbligatorio',
            'province.required' => 'La provincia è obbligatoria',
            'city.required' => 'La città è obbligatoria',
            'cap.required' => 'Il CAP è obbligatorio',
            'shipping_method_id.required' => 'Il metodo di spedizione è obbligatorio',
            'total_price.required' => 'Il prezzo totale è obbligatorio',
        ];
    }
}
