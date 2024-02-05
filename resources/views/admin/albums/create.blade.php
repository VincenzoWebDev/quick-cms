@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Inserisci un nuovo album</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('albums.store') }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="mb-3">
            <label for="album_name">Nome album</label>
            <input type="text" name="album_name" id="album_name" class="form-control" placeholder="Nome album"
                value="{{ old('album_name') }}">
        </div>

        <div class="mb-3">
            <label for="description">Descrizione</label>
            <textarea name="description" id="description" class="form-control" placeholder="Descrizione">{{ old('description') }}</textarea>
        </div>

        @include('admin.albums.partials.category_combo')

        @include('admin.albums.partials.fileupload')

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Inserisci</button>
            <a href="{{ route('albums') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
@section('scripts')

@endsection
