<?php

namespace App\Http\Requests\Front;

use Illuminate\Foundation\Http\FormRequest;

class ProductListFilterRequest extends FormRequest
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
            'sortBy' => 'nullable|in:id,name,price,created_at',
            'sortDirection' => 'in:asc,desc',
            'perPage' => 'integer|min:10|max:50',
            'q' => 'nullable|string|max:255|regex:/^[a-zA-Z0-9\s\.,]+$/',
            // 'page' => 'integer|min:1',
            'minPrice' => 'numeric|min:0|max:100',
            'maxPrice' => 'numeric|min:0|max:1000',
        ];
    }
    public function messages(): array
    {
        return [
            'perPage.integer' => 'Ricerca per record deve essere un numero intero',
            'perPage.min' => 'Ricerca per record deve essere almeno 10',
            'perPage.max' => 'Ricerca per record deve essere al massimo 50',
            'q.max' => 'Il campo ricerca deve avere al massimo 255 caratteri',
            'q.regex' => 'Il campo ricerca deve contenere solo lettere, numeri, spazi, virgole e punti',
            'page.integer' => 'Pagina deve essere un numero intero',
            'page.min' => 'Pagina deve parire da 1',
            'minPrice.numeric' => 'Il prezzo minimo deve essere un numero',
            'minPrice.min' => 'Il prezzo minimo deve essere almeno 0',
            'minPrice.max' => 'Il prezzo minimo deve essere al massimo 100',
            'maxPrice.numeric' => 'Il prezzo massimo deve essere un numero',
            'maxPrice.min' => 'Il prezzo massimo deve essere almeno 0',
            'maxPrice.max' => 'Il prezzo massimo deve essere al massimo 1000',
        ];
    }
}
