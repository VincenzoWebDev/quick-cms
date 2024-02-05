<div class="mb-3">
    <label for="album_thumb">Thumbnail</label>
    <input type="file" name="album_thumb" id="album_thumb" class="form-control">
</div>

@if ($album->album_thumb)
    <div class="mb-3">
        <img src="{{ asset($album->path) }}" title="{{ $album->album_name }}" alt="{{ $album->album_name }}"
            width="300">
    </div>
@endif
