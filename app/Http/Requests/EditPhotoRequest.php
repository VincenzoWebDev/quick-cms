<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditPhotoRequest extends FormRequest
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
            'album_id' => 'required',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Il nome dell\'immagine è obbligatorio',
            'album_id.required' => 'L\'album è obbligatorio',
        ];
    }
}
