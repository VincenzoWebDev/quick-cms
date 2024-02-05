<div class="mb-3">
    <label for="img_path">Thumbnail</label>
    <input type="file" name="img_path" id="img_path" class="form-control" value="{{ $photo->img_path }}">
</div>

@if ($photo->img_path)
    <div class="mb-3">
        <img src="{{ asset($photo->path) }}" title="{{ $photo->name }}" alt="{{ $photo->name }}" width="300">
    </div>
@endif
