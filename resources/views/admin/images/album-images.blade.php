@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Lista immagini album</h1>
    @if (session()->has('message'))
        @php
            $messaggio = session('message');
        @endphp

        <div class="alert alert-{{ $messaggio['tipo'] }}" role="alert">
            <strong>{{ $messaggio['testo'] }}</strong>
        </div>
    @endif

    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <a href="{{ route('photos.create') }}?album_id={{ $album->id }}" class="btn cb-primary mb-3">Inserisci nuova
            immagine</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Titolo immagine</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Album</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col">Creato il</th>
                    </tr>
                </thead>
                <tbody>
                    @if ($photos)
                        @foreach ($photos as $photo)
                            <tr>
                                <td scope="row">{{ $photo->id }}</td>
                                <td scope="row" class="col-md-3">{{ $photo->name }}</td>
                                <td scope="row" class="col-md-4">{{ $photo->description }}</td>
                                <td scope="row">{{ $album->album_name }}</td>
                                <td scope="row"><img src="{{ asset($photo->path) }}" width="120"></td>
                                <td scope="row">{{ $photo->created_at }}</td>
                                <td scope="row" class="text-center">
                                    <a href="{{ route('photos.edit', $photo->id) }}" class="btn btn-outline-success me-3">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <a href="{{ route('photos.destroy', $photo->id) }}" class="btn btn-outline-danger"
                                        onclick="return confirm('Sicuro di eliminare?')">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td scope="row"></td>
                            <td scope="row" class="col-md-3"></td>
                            <td scope="row" class="col-md-4"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                            <td scope="row"></td>
                        </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
    <div class="mb-3">
        <a href="{{ route('albums') }}" class="btn btn-secondary">Torna indietro</a>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {

            $('div.alert').fadeOut(5000);

            $('table').on('click', 'a.btn-outline-danger', function(e) {
                e.preventDefault();

                var urlImg = $(this).attr('href');
                var tr = e.target.parentNode.parentNode;

                $.ajax({
                    url: urlImg,
                    method: 'DELETE',
                    data: {
                        '_token': '{{ csrf_token() }}'
                    },
                    success: function(resp) {
                        console.log(resp);
                        if (resp == true) {
                            tr.parentNode.removeChild(tr);
                        } else {
                            alert('Errore durante l\'eliminazione della foto');
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
        });
    </script>
@endsection
