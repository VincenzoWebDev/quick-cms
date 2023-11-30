@extends('layouts.admin.app')

@section('title', 'Admin panel')

@section('container')
    @component('components.dashboard', 
    [
        'users' => $users,
        'albums' => $albums,
        'photos' => $photos
    ])
    @endcomponent
@endsection

