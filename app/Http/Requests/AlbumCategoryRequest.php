<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AlbumCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = Auth::id();
        return [
            'category_name' => [
                'required',
                Rule::unique('album_categories', 'category_name')->where('user_id', $userId),
            ],
        ];
    }

    public function messages()
    {
        return [
            'category_name.required' => 'Nome categoria obbligatorio',
            'category_name.unique' => 'Nome categoria già esistente'
        ];
    }
}
