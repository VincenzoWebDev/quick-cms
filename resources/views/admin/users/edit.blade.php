@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Modifica user</h1>

    @include('partials.admin.inputErrors')

    <form action="{{ route('users.update', $user->id) }}" method="POST">
        {{ csrf_field() }}
        <input type="hidden" name="_method" value="PATCH">
        <div class="mb-3">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" class="form-control" value="{{ old('name', $user->name) }}"
                placeholder="Nome utente">
        </div>

        <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" value="{{ old('email', $user->email) }}"
                placeholder="Email">
        </div>

        <div class="mb-3">
            <label for="role">Ruolo</label>
            <select class="form-select" aria-label="Default select example" name="role" id="role">
                <option value="" {{ $user->role == ' ' ? 'selected' : ''}}>Seleziona ruolo</option>
                <option value="user" {{ $user->role == 'user' ? 'selected' : ''}}>user</option>
                <option value="admin" {{ $user->role == 'admin' ? 'selected' : ''}}>admin</option>
            </select>
        </div>

        <div class="mb-3">
            <button type="submit" class="btn cb-primary">Modifica</button>
            <a href="{{ route('users') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
        <input type="hidden" name="id" value="{{ $user->id}}">
    </form>
    
@endsection
