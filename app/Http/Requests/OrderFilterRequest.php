<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderFilterRequest extends FormRequest
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
            'sortBy' => 'in:id,total,date',
            'sortDirection' => 'in:asc,desc',
            'perPage' => 'integer|min:10|max:50',
            'q' => 'nullable|string|max:255|regex:/^[a-zA-Z0-9\s\.,]+$/',
            'page' => 'integer|min:1',
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
        ];
    }
}
