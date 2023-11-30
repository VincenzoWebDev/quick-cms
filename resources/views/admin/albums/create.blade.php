@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Inserisci un nuovo album</h1>

    <form action="{{ route('albums.save') }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="mb-3">
            <label for="album_name">Nome album</label>
            <input type="text" name="album_name" id="album_name" class="form-control" placeholder="Nome album">
        </div>

        <div class="mb-3">
            <label for="description">Descrizione</label>
            <textarea name="description" id="description" class="form-control" placeholder="Descrizione"></textarea>
        </div>

        @include('partials.admin.fileupload')

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Inserisci</button>
            <a href="{{ route('albums') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
@section('scripts')

@endsection
