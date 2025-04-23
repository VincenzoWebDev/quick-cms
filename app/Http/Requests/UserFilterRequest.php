<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserFilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        return [
            'sortBy' => 'in:id,name,email,role,created_at',
            'sortDirection' => 'in:asc,desc',
            'perPage' => 'integer|min:10|max:50',
            'q' => 'nullable|string|max:255|regex:/^[a-zA-Z0-9\s\.,]+$/',
            'page' => 'integer|min:1',
        ];
    }
    public function messages(): array
    {
        return [
            'sortBy.in' => 'Ordinamento non valido',
            'sortDirection.in' => 'Direzione non valida',
            'perPage.integer' => 'Ricerca per record deve essere un numero intero',
            'perPage.min' => 'Ricerca per record deve essere almeno 10',
            'perPage.max' => 'Ricerca per record deve essere al massimo 50',
            'q.max' => 'Il campo ricerca deve avere al massimo 255 caratteri',
            'q.regex' => 'Il campo ricerca deve contenere solo lettere, numeri, spazi, virgole e punti',
            'page.integer' => 'La paginazione deve essere un numero intero',
            'page.min' => 'La paginazione deve parire da 1',
        ];
    }
}
