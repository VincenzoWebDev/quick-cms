@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica tema</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('themes.update', $theme->id) }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
        <div class="mb-3">
            <label for="name">Nome tema</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $theme->name) }}"
                placeholder="Nome tema">
        </div>

        <div class="mb-3">
            <label for="path">Percorso</label>
            <textarea name="path" id="path" class="form-control" placeholder="Percorso">{{ old('path', $theme->path) }}</textarea>
        </div>

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Modifica</button>
            <a href="{{ route('themes') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
