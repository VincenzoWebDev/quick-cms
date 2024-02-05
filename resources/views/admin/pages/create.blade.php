@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Inserisci una nuova pagina</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('pages.store') }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="mb-3">
            <label for="title">Nome pagina</label>
            <input type="text" name="title" id="title" class="form-control" placeholder="Titolo pagina"
                value="{{ old('title') }}">
        </div>

        <div class="mb-3">
            <label for="content">Descrizione</label>
            <textarea name="content" id="content_editor" class="form-control" placeholder="Descrizione">{{ old('content') }}</textarea>
        </div>

        <div class="mb-3">
            <label for="meta_title">Meta title</label>
            <input type="text" name="meta_title" id="meta_title" class="form-control" placeholder="Meta title"
                value="{{ old('meta_title') }}">
        </div>

        <div class="mb-3">
            <label for="meta_description">Meta description</label>
            <input type="text" name="meta_description" id="meta_description" class="form-control"
                placeholder="Meta description" value="{{ old('meta_description') }}">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Inserisci</button>
            <a href="{{ route('pages.index') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
@section('scripts')

@endsection
