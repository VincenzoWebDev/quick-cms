@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    <h1>Lista albums</h1>
    @if (session()->has('message'))
        @php
            $messaggio = session('message');
        @endphp

        <div class="alert alert-{{ $messaggio['tipo'] }}" role="alert">
            <strong>{{ $messaggio['testo'] }}</strong>
        </div>
    @endif

    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <a href="{{ route('albums.create') }}" class="btn btn-primary">Inserisci nuovo album</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover">
                <thead class="text-primary">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome album</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($albums as $album)
                        <tr>
                            <td scope="row">{{ $album->id }}</td>
                            <td scope="row">{{ $album->album_name }}</td>
                            <td scope="row" class="col-md-5">{{ $album->description }}</td>
                            <td scope="row"><img src="{{ asset($album->path) }}" width="120"></td>
                            <td scope="row" class="text-center">
                                @if ($album->photos_count)
                                    <a href="{{ url('admin/albums/' . $album->id . '/photos') }}"
                                        class="btn btn-warning me-3">Mostra immagini ({{ $album->photos_count }})</a>
                                @endif
                                <a href="{{ url('admin/albums/' . $album->id . '/edit') }}"
                                    class="btn btn-success me-3">Modifica</a>
                                <a href="{{ route('albums.destroy', $album->id) }}" class="btn btn-danger"
                                    onclick="return confirm('Sicuro di eliminare?')">Elimina</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="d-flex justify-content-center">
        {{ $albums->links('pagination::bootstrap-5') }}
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {

            $('div.alert').fadeOut(5000);

            $('table').on('click', 'a.btn-danger', function(e) {
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
                            alert('Errore durante l\'eliminazione dell\'album');
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
