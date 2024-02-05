<?php

namespace App\Http\Requests;

use App\Http\Middleware\VerifyIsAdmin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if(!Auth::user()->isAdmin()) {
            return false;
        }
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
            'title' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'title' => 'Il titolo della pagina è obbligatorio',
        ];
    }
}
