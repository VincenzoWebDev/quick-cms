@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica pagina</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('pages.update', $page->id) }}" method="POST" enctype="multipart/form-data">
        {{ csrf_field() }}
        {{ method_field('PATCH') }}
        <div class="mb-3">
            <label for="title">Nome pagina</label>
            <input type="text" name="title" id="title" class="form-control" value="{{ old('title', $page->title) }}"
                placeholder="Nome pagina">
        </div>

        <div class="mb-3">
            <label for="content">Descrizione</label>
            <textarea name="content" id="content_editor" class="form-control" placeholder="Descrizione">{{ old('content', $page->content) }}</textarea>
        </div>

        <div class="mb-3">
            <label for="meta_title">Meta title</label>
            <input type="text" name="meta_title" id="meta_title" class="form-control" placeholder="Meta title"
                value="{{ old('content', $page->meta_title) }}">
        </div>

        <div class="mb-3">
            <label for="meta_description">Meta description</label>
            <input type="text" name="meta_description" id="meta_description" class="form-control"
                placeholder="Meta description" value="{{ old('content', $page->meta_description) }}">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Modifica</button>
            <a href="{{ route('pages.index') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection
