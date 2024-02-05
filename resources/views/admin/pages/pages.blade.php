@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Gestione pagine</h1>

    @if (session()->has('message'))
        @php
            $messaggio = session('message');
        @endphp

        <div class="alert alert-{{ $messaggio['tipo'] }}" role="alert">
            <strong>{{ $messaggio['testo'] }}</strong>
        </div>
    @endif

    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <a href="{{ route('pages.create') }}" class="btn cb-primary mb-3">Inserisci nuova pagina</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titolo pagina</th>
                        <th scope="col">Descrizione pagina</th>
                        <th scope="col">Stato</th>
                        <th scope="col">Creato il</th>
                        <th scope="col">Aggiornato il</th>
                        <th scope="col" class="text-center">Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    @if ($pages->count() > 0)
                        @foreach ($pages as $page)
                            <tr id="tr-{{ $page->id }}">
                                <td scope="row">{{ $page->id }}</td>
                                <td scope="row">{{ $page->title }}</td>
                                <td scope="row">{{ $page->meta_description }}</td>
                                <td scope="row">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input page-switch" type="checkbox" role="switch"
                                            id="flexSwitchCheckDefault" style="width:40px; height:20px"
                                            {{ $page->active == 1 ? 'checked' : '' }} data-page-id="{{ $page->id }}" />
                                    </div>
                                </td>
                                <td scope="row">{{ $page->created_at }}</td>
                                <td scope="row">{{ $page->updated_at }}</td>
                                <td scope="row" class="text-center">
                                    <a href="{{ route('pages.edit', $page->id) }}" class="btn btn-outline-success me-3">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <form action="{{ route('pages.destroy', $page->id) }}" method="post" class="d-inline"
                                        id="form{{ $page->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button id='btnDelete-{{ $page->id }}' class="btn btn-outline-danger">
                                            <i class="fa-regular fa-trash-can"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td>Non ci sono pagine</td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>

@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('div.alert').fadeOut(5000);

            $('form .btn-outline-danger').on('click', function(evt) {
                evt.preventDefault();
                var button = $(this);
                var form = button.closest('form');
                var PageId = this.id.replace('btnDelete-', '');
                var trId = 'tr-' + PageId;
                var urlPage = form.prop('action');

                if (confirm('Sicuro di eliminare?')) {
                    $.ajax({
                        url: urlPage,
                        method: 'DELETE',
                        data: {
                            '_token': Laravel.csrfToken
                        },
                        success: function(res) {
                            if (res) {
                                $('#' + trId).animate({
                                    opacity: 0
                                }, 500, function() {
                                    $(this).remove();
                                });
                            } else {
                                alert('Errore durante l\'eliminazione della pagina');
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

            $('input.page-switch').change(function() {
                let pageId = $(this).data('page-id');
                let isActive = $(this).prop('checked'); // Questo restituisce true o false

                $.ajax({
                    url: `/admin/pages/${pageId}`,
                    type: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    data: {
                        active: isActive
                    },
                    success: function(data) {
                        // Puoi gestire la risposta dal server qui, se necessario
                        console.log(data);
                    },
                    error: function(error) {
                        console.error('Errore durante l\'aggiornamento dello stato della pagina:',
                            error);
                    }
                });
            });
        });
    </script>
@endsection
