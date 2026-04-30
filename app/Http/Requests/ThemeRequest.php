<?php

namespace App\Http\Requests;

use App\Models\Theme;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ThemeRequest extends FormRequest
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
        $theme = $this->route('theme') instanceof Theme
            ? $this->route('theme')
            : Theme::find($this->route('id'));

        return [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['nullable', Rule::in(['content', 'ecommerce'])],
            'description' => ['nullable', 'string'],
            'parent_theme_id' => ['nullable', 'integer', 'exists:themes,id'],
            'activate_after_create' => ['nullable', 'boolean'],
            'path' => ['nullable', 'string'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('themes', 'slug')->ignore($theme?->id)],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Il nome del tema è obbligatorio',
            'type.in' => 'Il tipo tema non è valido',
            'parent_theme_id.exists' => 'Il tema base selezionato non esiste',
        ];
    }
}
