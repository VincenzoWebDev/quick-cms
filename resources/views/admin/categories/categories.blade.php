@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Lista categorie albums</h1>
    @if (session()->has('message'))
        @php
            $messaggio = session('message');
        @endphp

        <div class="alert alert-{{ $messaggio['tipo'] }}" role="alert">
            <strong>{{ $messaggio['testo'] }}</strong>
        </div>
    @endif

    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <a href="{{ route('categories.create') }}" class="btn cb-primary mb-3">Inserisci nuova categoria</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover table-bordered">
                <thead class="text-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome categoria</th>
                        <th scope="col">Data creazione</th>
                        <th scope="col">Data aggiornamento</th>
                        <th scope="col">Numeri di album</th>
                        <th scope="col" class="text-center">Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    @if ($albumsCategory->count() > 0)
                        @foreach ($albumsCategory as $cat)
                            <tr id="tr{{ $cat->id }}">
                                <td scope="row">{{ $cat->id }}</td>
                                <td scope="row">{{ $cat->category_name }}</td>
                                <td scope="row" class="col-md-2">{{ $cat->created_at }}</td>
                                <td scope="row" class="col-md-2">{{ $cat->updated_at }}</td>
                                <td scope="row" class="col-md-2">{{ $cat->albums_count }}</td>
                                <td scope="row" class="text-center">
                                    <a href="{{ route('categories.edit', $cat->id) }}" class="btn btn-outline-success me-3">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <form action="{{ route('categories.destroy', $cat->id) }}" method="post"
                                        class="d-inline" id="form{{ $cat->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button id={{ $cat->id }} class="btn btn-outline-danger">
                                            <i class="fa-regular fa-trash-can"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td>Non ci sono categorie</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>

    @include('partials.admin.pagination')
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {

            $('div.alert').fadeOut(5000);

            $('table').on('click', 'button.btn-outline-danger', function(evt) {
                evt.preventDefault();

                var button = $(this);
                var form = button.closest('form');
                var urlAlbum = form.prop('action');
                var tr = form.closest('tr');
                if (confirm('Sicuro di eliminare?')) {
                    $.ajax({
                        url: urlAlbum,
                        method: 'DELETE',
                        data: {
                            '_token': '{{ csrf_token() }}'
                        },
                        success: function(res) {
                            if (res) {
                                tr.animate({
                                    opacity: 0
                                }, 500, function() {
                                    $(this).remove();
                                });
                            } else {
                                alert('Errore durante l\'eliminazione della categoria');
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error(xhr.responseText);
                            alert(
                                'Errore nella richiesta Ajax. Controlla la console per i dettagli.'
                            );
                        }
                    });
                }
            });
        });
    </script>
@endsection
