@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica foto album</h1>

    <form action="/admin/photos/{{ $photo->id }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <input type="hidden" name="_method" value="PATCH">
        <div class="mb-3">
            <label for="album_name">Titolo immagine</label>
            <input type="text" name="album_name" id="album_name" class="form-control" value="{{ $photo->name }}"
                placeholder="Nome album">
        </div>

        <div class="mb-3">
            <label for="description">Descrizione</label>
            <textarea name="description" id="description" class="form-control" placeholder="Descrizione">{{ $photo->description }}</textarea>
        </div>

        @include('partials.admin.fileupload')

        @if ($photo->img_path)
            <div class="mb-3">
                <img src="{{ asset($photo->path) }}" title="{{ $photo->name }}" alt="{{ $photo->name }}" width="300">
            </div>
        @endif

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Modifica</button>
            <a href="{{ url('admin/albums/' . $album->id . '/photos') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
