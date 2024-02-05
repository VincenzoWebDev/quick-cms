@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica foto album</h1>
    
    @include('partials.admin.inputErrors')

    @if (session()->has('message'))
        @php
            $messaggio = session('message');
        @endphp

        <div class="alert alert-{{ $messaggio['tipo'] }}" role="alert">
            <strong>{{ $messaggio['testo'] }}</strong>
        </div>
    @endif

    <form action="{{ route('photos.update', $photo->id) }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
        <div class="mb-3">
            <label for="name">Titolo immagine</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ $photo->name }}"
                placeholder="Nome album">
        </div>

        <div class="mb-3">
            <label for="description">Descrizione</label>
            <textarea name="description" id="description" class="form-control" placeholder="Descrizione">{{ $photo->description }}</textarea>
        </div>

        <div class="mb-3">
            <select class="form-select" aria-label="Default select example" name="album_id" id="album_id">
                @foreach ($albums as $album)
                    <option {{ $album->id == $photo->album_id ? 'selected' : '' }} value="{{ $album->id }}">{{ $album->album_name }}</option>
                @endforeach
            </select>
        </div>

        @include('admin.images.partials.fileupload')

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Modifica</button>
            <a href="{{ route('albums.photos', $photo->album_id) }}" class="btn btn-secondary">Torna
                indietro</a>
        </div>
    </form>
@endsection
