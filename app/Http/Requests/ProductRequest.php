<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'gallery' => 'nullable',
            'gallery.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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
        ];
    }
}