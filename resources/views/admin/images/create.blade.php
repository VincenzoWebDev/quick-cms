@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Inserisci nuova immagine</h1>
    @if (isset($_GET['album_id']))
        @php $album_id = $_GET['album_id'] @endphp
    @endif

    @include('partials.admin.inputErrors')

    <form action="{{ route('photos.store') }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="mb-3">
            <label for="name">Titolo immagine</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="Titolo immagine">
        </div>

        <div class="mb-3">
            <label for="description">Descrizione</label>
            <textarea name="description" id="description" class="form-control" placeholder="Descrizione"></textarea>
        </div>

        <div class="mb-3">
            <select class="form-select" aria-label="Default select example" name="album_id" id="album_id">
                @if (!isset($album_id))
                    <option selected value="0">Inserisci album</option>
                    @foreach ($albums as $album)
                        <option value="{{ $album->id }}">{{ $album->album_name }}</option>
                    @endforeach
                @elseif(isset($album_id))
                    @foreach ($albums as $album)
                        <option {{ $album->id == $album_id ? 'selected' : '' }} value="{{ $album->id }}">
                            {{ $album->album_name }}</option>
                    @endforeach
                @else
                    @foreach ($albums as $album)
                        <option value="{{ $album->id }}">{{ $album->album_name }}</option>
                    @endforeach
                @endif
            </select>
        </div>

        @include('admin.images.partials.fileupload')

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Inserisci</button>

            @if (isset($album_id))
                <a href="{{ route('albums.photos', $album_id) }}" class="btn btn-secondary">Torna indietro</a>
            @else
                <a href="{{ route('albums') }}" class="btn btn-secondary">Torna indietro</a>
            @endif
        </div>
    </form>
@endsection
@section('scripts')

@endsection
