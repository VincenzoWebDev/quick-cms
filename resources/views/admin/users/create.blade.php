@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Inserisci nuovo utente</h1>

    <form action="{{ route('users.save') }}" method="POST">
        {{ csrf_field() }}
        <div class="mb-3">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="Nome utente">
        </div>

        <div class="mb-3">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="Password">
        </div>

        <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" placeholder="Email">
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">Inserisci</button>
            <a href="{{ route('users') }}" class="btn btn-secondary">Torna indietro</a>
        </div>
    </form>
@endsection

@section('scripts')
    
@endsection
