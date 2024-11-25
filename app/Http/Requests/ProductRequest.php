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
            ],
            'canonical_url' => 'nullable|url',
            'og_title' => 'nullable|string|max:60',
            'og_description' => 'nullable|string|max:160',
            'og_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'twitter_title' => 'nullable|string|max:60',
            'twitter_description' => 'nullable|string|max:160',
            'twitter_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
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
            'canonical_url.url' => 'Il canonical url deve essere un URL valido',
            'og_title.max' => 'Il og title deve essere inferiore a 60 caratteri',
            'og_description.max' => 'Il og description deve essere inferiore a 160 caratteri',
            'og_image.image' => 'Il og image deve essere un\'immagine',
            'og_image.mimes' => 'Il og image deve essere in un formato valido',
            'og_image.max' => 'Il og image deve essere inferiore a 2048 kilobyte',
            'twitter_title.max' => 'Il twitter title deve essere inferiore a 60 caratteri',
            'twitter_description.max' => 'Il twitter description deve essere inferiore a 160 caratteri',
            'twitter_image.image' => 'Il twitter image deve essere un\'immagine',
            'twitter_image.mimes' => 'Il twitter image deve essere in un formato valido',
            'twitter_image.max' => 'Il twitter image deve essere inferiore a 2048 kilobyte',
        ];
    }
}
