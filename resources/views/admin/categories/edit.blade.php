@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica categoria</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('categories.update', $category->id) }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
        <div class="mb-3">
            <label for="category_name">Nome categoria</label>
            <input type="text" name="category_name" id="category_name" class="form-control"
                value="{{ old('category_name', $category->category_name) }}" placeholder="Nome categoria">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Modifica</button>
            <a href="{{ route('categories.index') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
