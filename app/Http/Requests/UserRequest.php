<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
            'name' => 'required|max:255',
            'lastname' => 'required|max:255',
            'password' => 'required|nullable|min:6',
            'email' => 'required|max:255|unique:users',
            'role' => [
                'required',
                Rule::in(['user', 'admin'])
            ]
        ];
    }
    public function messages(): array
    {
        return [
            'name' => 'Il nome è obbligatorio',
            'lastname' => 'Il cognome è obbligatorio',
            'password' => 'La password è obbligatoria',
            'email.required' => 'Il campo email è obbligatorio',
            'email.unique' => 'Email già in uso',
            'role' => 'Il ruolo è obbligatorio',
        ];
    }
}
