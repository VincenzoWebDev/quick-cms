@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica album</h1>

    <form action="/admin/albums/{{ $album->id }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <input type="hidden" name="_method" value="PATCH">
        <div class="mb-3">
            <label for="album_name">Nome album</label>
            <input type="text" name="album_name" id="album_name" class="form-control" value="{{ $album->album_name }}"
                placeholder="Nome album">
        </div>

        <div class="mb-3">
            <label for="description">Descrizione</label>
            <textarea name="description" id="description" class="form-control" placeholder="Descrizione">{{ $album->description }}</textarea>
        </div>

        @include('partials.admin.fileupload')

        @if ($album->album_thumb)
            <div class="mb-3">
                <img src="{{ asset($album->path) }}" title="{{ $album->album_name }}" alt="{{ $album->album_name }}" width="300">
            </div>
        @endif

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Modifica</button>
            <a href="{{ route('albums') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
