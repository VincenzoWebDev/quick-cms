<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditProfileRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'email'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Il nome è obbligatorio',
            'lastname.required' => 'Il cognome è obbligatorio',
            'email.required' => 'L\'email è obbligatoria',
        ];
    }
}
