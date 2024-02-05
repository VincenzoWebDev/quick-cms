@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Gestione temi</h1>

    @if (session()->has('message'))
        @php
            $messaggio = session('message');
        @endphp

        <div class="alert alert-{{ $messaggio['tipo'] }}" role="alert">
            <strong>{{ $messaggio['testo'] }}</strong>
        </div>
    @endif

    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <a href="{{ route('themes.create') }}" class="btn cb-primary mb-3">Inserisci nuovo tema</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome team</th>
                        <th scope="col">Stato</th>
                        <th scope="col" class="text-center">Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($themes as $theme)
                        <tr id="tr{{ $theme->id }}">
                            <td scope="row">{{ $theme->id }}</td>
                            <td scope="row">{{ $theme->name }}</td>
                            <td scope="row">
                                <div class="form-check form-switch">
                                    <input class="form-check-input theme-switch" type="checkbox" role="switch"
                                        id="flexSwitchCheckDefault" style="width:40px; height:20px"
                                        {{ $theme->active == 1 ? 'checked' : '' }} data-theme-id="{{ $theme->id }}" />
                                </div>
                            </td>
                            <td scope="row" class="text-center">
                                <a href="{{ route('themes.edit', $theme->id) }}" class="btn btn-outline-success me-3">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </a>
                                <form action="{{ route('themes.destroy', $theme->id) }}" method="post" class="d-inline"
                                    id="form{{ $theme->id }}">
                                    @csrf
                                    @method('DELETE')
                                    <button id={{ $theme->id }} class="btn btn-outline-danger"
                                        onclick="return confirm('Sicuro di eliminare?')">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection

@section('scripts')
    <script>
        $(document).ready(function() {

            $('div.alert').fadeOut(5000);

            $('table').on('click', 'button.btn-outline-danger', function(evt) {
                evt.preventDefault();
                var id = evt.target.id;
                var f = $('#form' + id);

                var urlTheme = f.prop('action');
                //var urlAlbum = f.attr('action');
                var tr = $('#tr' + id);

                $.ajax({
                    url: urlTheme,
                    method: 'DELETE',
                    data: {
                        '_token': '{{ csrf_token() }}'
                    },
                    success: function(resp) {
                        console.log(resp);
                        if (resp == true) {
                            tr.remove();
                        } else {
                            alert('Errore durante l\'eliminazione del tema');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText);
                        alert(
                            'Errore nella richiesta Ajax. Controlla la console per i dettagli.'
                        );
                    }
                });
            });

            $('input.theme-switch').change(function() {
                let themeId = $(this).data('theme-id');
                let isActive = $(this).prop('checked'); // Questo restituisce true o false

                $.ajax({
                    url: `./themes/${themeId}`,
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
                        console.error('Errore durante l\'aggiornamento dello stato del tema:',
                            error);
                    }
                });
            });
        });
    </script>
@endsection
