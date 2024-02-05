@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica album</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('albums.update', $album->id) }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
        <div class="mb-3">
            <label for="album_name">Nome album</label>
            <input type="text" name="album_name" id="album_name" class="form-control"
                value="{{ old('album_name', $album->album_name) }}" placeholder="Nome album">
        </div>

        <div class="mb-3">
            <label for="description">Descrizione</label>
            <textarea name="description" id="description" class="form-control" placeholder="Descrizione">{{ old('description', $album->description) }}</textarea>
        </div>

        @include('admin.albums.partials.category_combo')

        @include('admin.albums.partials.fileupload')

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Modifica</button>
            <a href="{{ route('albums') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
