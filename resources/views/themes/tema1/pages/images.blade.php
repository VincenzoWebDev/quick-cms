@extends('layouts.tema1.app')

@section('container')
    <div class="row text-center text-lg-start">
        @if (count($images) > 0)
            @foreach ($images as $image)
                <div class="col-lg-3 col-md-4 col-6">
                    <a href="javascript:;" class="mb-4 h-100">
                        <img class="img-fluid img-thumbnail" src="{{ asset($image->path) }}" alt="{{ $image->name }}"
                            title="{{ $image->name }}" data-action="zoom">
                    </a>
                </div>
            @endforeach
        @else
            <h3>Nessuna immagine in questo album!</h3>
        @endif
    </div>
@endsection
