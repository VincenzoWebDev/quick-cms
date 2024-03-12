<?php

namespace App\Http\Requests;

use App\Models\AlbumCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class EditAlbumCategoryRequest extends FormRequest
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
        $userId = auth()->user()->id;
        return [
            'category_name' => [
                'required',
                Rule::unique('album_categories', 'category_name')->where('user_id', $userId)->ignore($this->category->id),
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'category_name.required' => 'Nome categoria è obbligatorio',
            'category_name.unique' => 'Nome categoria già esistente',
        ];
    }
}
