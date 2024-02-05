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
        <a href="{{ route('albums.create') }}" class="btn cb-primary mb-3">Inserisci nuovo album</a>
    </div>

    <div class="card" style="min-height: 485px">
        <div class="card-content table-responsive">
            <table class="table table-hover table-bordered">
                <thead class="text-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome album</th>
                        <th scope="col">Autore</th>
                        <th scope="col">Categorie</th>
                        <th scope="col">Thumbnail</th>
                        <th scope="col" class="text-center">Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    @if ($albums->count() > 0)
                        @foreach ($albums as $album)
                            <tr id="tr-{{ $album->id }}">
                                <td scope="row">{{ $album->id }}</td>
                                <td scope="row">{{ $album->album_name }}</td>
                                <td scope="row">{{ $album->user->name }}</td>
                                <td scope="row">
                                    @if ($album->categories->count() > 0)
                                        @foreach ($album->categories as $cat)
                                            <li>{{ $cat->category_name }}</li>
                                        @endforeach
                                    @else
                                        <span>Nessuna categoria</span>
                                    @endif
                                </td>
                                <td scope="row"><img src="{{ asset($album->path) }}" width="120"></td>
                                <td scope="row" class="text-center">
                                    @if ($album->photos_count)
                                        <a href="{{ route('albums.photos', $album->id) }}"
                                            class="btn btn-outline-warning me-3">
                                            <i class="fa-regular fa-image"></i>
                                        </a>
                                    @else
                                        <a href="{{ route('photos.create', ['album_id' => $album->id]) }}"
                                            class="btn btn-outline-warning me-3">
                                            <i class="fa-solid fa-plus"></i>
                                        </a>
                                    @endif
                                    <a href="{{ route('albums.edit', $album->id) }}" class="btn btn-outline-success me-3">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <form action="{{ route('albums.destroy', $album->id) }}" method="post"
                                        class="d-inline" id="form{{ $album->id }}">
                                        @csrf
                                        @method('DELETE')
                                        <button id='btnDelete-{{ $album->id }}' class="btn btn-outline-danger">
                                            <i class="fa-regular fa-trash-can"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    @else
                        <tr>
                            <td>Non ci sono album</td>
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

            $('.btn-outline-danger').on('click', function(evt) {
                evt.preventDefault();
                var button = $(this);
                var form = button.closest('form');
                var albumId = this.id.replace('btnDelete-', '');
                var trId = 'tr-' + albumId;
                var urlAlbum = form.prop('action');

                if (confirm('Sicuro di eliminare?')) {
                    $.ajax({
                        url: urlAlbum,
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
