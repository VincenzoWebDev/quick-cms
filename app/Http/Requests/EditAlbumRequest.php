<?php

namespace App\Http\Requests;

use App\Models\Album;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class EditAlbumRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $album = Album::find($this->album->id);
        if (Gate::denies('update', $album)) {
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
            'album_name' => 'required',
            //'album_thumb' => 'required|image'
            //'user_id' => 'required'
        ];
    }
    public function messages(): array
    {
        return [
            'album_name' => 'Il nome dell\'album è obbligatorio'
        ];
    }
}
