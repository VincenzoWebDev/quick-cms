@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Inserisci una nuova categoria</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('categories.store') }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="mb-3">
            <label for="category_name">Nome categoria</label>
            <input type="text" name="category_name" id="category_name" class="form-control" placeholder="Nome categoria"
                value="{{ old('category_name') }}">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Inserisci</button>
            <a href="{{ route('categories.index') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
@section('scripts')

@endsection
