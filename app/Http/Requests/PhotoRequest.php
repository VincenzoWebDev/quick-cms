<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhotoRequest extends FormRequest
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
            'description' => 'required',
            'album_id' => 'required|exists:albums,id',
            // 'img_path' => 'required|image|mimes:jpeg,jpg,png,gif|max:2048'
            'img_path' => 'sometimes|required', // Assicura che img_path sia un array
            'img_path.*' => 'sometimes|image|max:2048|mimes:jpeg,jpg,png,gif', // Applica la regola di validazione image a ogni elemento dell'array
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Il campo nome è obbligatorio',
            'description.required' => 'Il campo descrizione è obbligatorio',
            'album_id.required' => 'Il campo album è obbligatorio',
            'album_id.exists' => 'L\'album selezionato non esiste',
            'img_path.required' => 'Il campo immagine è obbligatorio',
            'img_path.image' => 'Il campo immagine deve essere un\'immagine'
        ];
    }
}
