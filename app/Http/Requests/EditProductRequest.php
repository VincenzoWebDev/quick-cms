<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class EditProductRequest extends FormRequest
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
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categories' => 'required|exists:categories,id',
            'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'gallery' => 'nullable',
            'gallery.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => [
                'nullable',
                'string',
                function ($attribute, $value, $fail) {
                    if (str_word_count($value) > 10) {
                        $fail("Massimo 10 parole per i meta keywords");
                    }
                },
            ]
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Il nome è obbligatorio',
            'name.max' => 'Il nome deve essere inferiore a 255 caratteri',
            'price.required' => 'Il prezzo è obbligatorio',
            'price.numeric' => 'Il prezzo deve essere un numero',
            'price.min' => 'Il prezzo deve essere maggiore di 0',
            'stock.required' => 'La quantità è obbligatoria',
            'stock.integer' => 'La quantità deve essere un numero intero',
            'stock.min' => 'La quantità deve essere maggiore di 0',
            'categories.required' => 'La categoria è obbligatoria',
            'categories.exists' => 'La categoria deve essere una categoria valida',
            'image_path.required' => "La thumbnail è obbligatoria",
            'image_path.image' => "La thumbnail deve essere un'immagine",
            'image_path.mimes' => "La thumbnail deve essere in un formato valido",
            'image_path.max' => "La thumbnail deve essere inferiore a 2048 kilobyte",
            'gallery.*.image' => 'La galleria deve contenere solo immagini',
            'gallery.*.mimes' => 'La galleria deve contenere solo immagini in un formato valido',
            'gallery.*.max' => 'La galleria deve contenere solo immagini di dimensioni minori di 2048 kilobyte',
            'meta_title.max' => 'Il meta title deve essere inferiore a 60 caratteri',
            'meta_description.max' => 'Il meta description deve essere inferiore a 160 caratteri',
            'meta_keywords.string' => 'Il meta keywords deve essere una stringa',
            'meta_keywords.max' => 'Il meta keywords deve essere inferiore a 10 parole',
        ];
    }
}
