@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Lista users</h1>
    @if (session()->has('message'))
        @php
            $messaggio = session('message');
        @endphp

        <div class="alert alert-{{ $messaggio['tipo'] }}" role="alert">
            <strong>{{ $messaggio['testo'] }}</strong>
        </div>
    @endif

    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <a href="{{ route('users.create') }}" class="btn btn-primary">Inserisci nuovo utente</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
                        <tr>
                            <td scope="row">{{ $user->id }}</td>
                            <td scope="row">{{ $user->name }}</td>
                            <td scope="row">{{ $user->email }}</td>
                            <td scope="row" class="d-flex justify-content-center">
                                <a href="{{ url('admin/users/' . $user->id . '/edit') }}"
                                    class="btn btn-success me-3">Modifica</a>
                                <a href="{{ url('admin/users/' . $user->id . '/delete') }}" class="btn btn-danger"
                                    onclick="return confirm('Sicuro di eliminare?')">Elimina</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="d-flex justify-content-center">
        {{ $users->links('pagination::bootstrap-5') }}
    </div>

@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('div.alert').fadeOut(5000);
        });
    </script>
@endsection
