<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EditUserRequest extends FormRequest
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
            'lastname' => 'required',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->id, 'id'),
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'name' => 'Il nome è obbligatorio',
            'lastname' => 'Il cognome è obbligatorio',
            'email.required' => 'L\'email è obbligatoria',
            'email.unique' => 'Email già esistente',
        ];
    }
}
