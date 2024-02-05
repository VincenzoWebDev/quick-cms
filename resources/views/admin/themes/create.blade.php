@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Inserisci un nuovo tema</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('themes.store') }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="mb-3">
            <label for="name">Nome tema</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="Nome tema" value="{{old('name')}}">
        </div>

        <div class="mb-3">
            <label for="path">Percorso</label>
            <textarea name="path" id="path" class="form-control" placeholder="Percorso">{{old('path')}}</textarea>
        </div>

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Inserisci</button>
            <a href="{{ route('themes') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
@section('scripts')

@endsection
