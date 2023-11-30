@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>modifica user</h1>

    <form action="/admin/users/{{ $user->id }}" method="POST">
        {{ csrf_field() }}
        <input type="hidden" name="_method" value="PATCH">
        <div class="mb-3">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ $user->name }}"
                placeholder="Nome utente">
        </div>

        <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" value="{{ $user->email }}"
                placeholder="Email">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Modifica</button>
            <a href="{{ route('users') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
    
@endsection
