<div class="mb-3">
    <select class="form-select" size="5" aria-label="Size 3 select example" name="categories[]" id="categories"
        multiple>
        @foreach ($categories as $cat)
            <option {{ in_array($cat->id, $selectedCategory) ? 'selected' : '' }} value="{{ $cat->id }}">{{ $cat->category_name }}</option>
        @endforeach
    </select>
</div>
