@extends('layouts.tema1.app')

@section('container')
    <div class="row row-cols-1 row-cols-md-5 g-4">
        @foreach ($albums as $album)
            <div class="card-group">
                <div class="card">
                    <img src="{{ asset($album->path) }}" class="card-img-top" alt="{{ $album->album_name }}">
                    <div class="card-body">
                        <h5 class="card-title"><a href="{{ route('gallery.album.images', $album->id) }}">{{ $album->album_name }}</a></h5>
                        <p class="card-text">{{ $album->description }}</p>
                    </div>
                    @if (count($album->categories) > 0)
                        <div class="card-body">
                            <span>Categorie: </span>
                            @foreach ($album->categories as $cat)
                                <a href="{{ route('gallery.album.category', $cat->id) }}" class="card-link ms-0 me-2">{{ Str::upper($cat->category_name) }}</a>
                            @endforeach
                        </div>
                    @endif
                </div>
            </div>
        @endforeach
    </div>
    @include('partials.tema1.pagination')
@endsection
