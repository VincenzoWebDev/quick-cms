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
        <a href="{{ route('users.create') }}" class="btn cb-primary mb-3">Inserisci nuovo utente</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover" id="users-table">
                <thead class="text-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ruolo</th>
                        <th scope="col">Creato il</th>
                        <th scope="col">Aggiornato il</th>
                        <th scope="col">Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>

    {{-- @include('partials.admin.pagination') --}}
@endsection

@section('scripts')
<script>
    $(document).ready(function() {
        $('div.alert').fadeOut(5000);

        $('#users-table').DataTable({
            processing: true,
            serverSide: true,
            "ajax": {
            "url": '{{ route('users') }}',
            },
            language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/it-IT.json',
            },
            columns: [
                {data: 'id', name: 'id'},
                {data: 'name', name: 'name'},
                {data: 'email', name: 'email'},
                {data: 'role', name: 'role'},
                {data: 'created_at', name: 'created_at'},
                {data: 'updated_at', name: 'updated_at'},
                {data: 'action', name: 'action', orderable: false, searchable: false}, 
            ],
            order: [
                [0, 'desc']
            ]
        });
    });
</script>
@endsection
