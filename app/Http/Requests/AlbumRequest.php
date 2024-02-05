<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlbumRequest extends FormRequest
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
            'album_name' => 'required',
            'album_thumb' => 'required|image'
            //'user_id' => 'required'
        ];
    }

    public function messages(): array
    {
        return [
            'album_name' => 'Il nome album è obbligatorio',
            'album_thumb' => 'La thumbnail è obbligatoria'
        ];
    }

}
