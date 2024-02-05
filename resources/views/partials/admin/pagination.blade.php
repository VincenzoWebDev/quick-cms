<div class="d-flex justify-content-center">
    @if (isset($albums))
        {{ $albums->links('pagination::bootstrap-5') }}
    @elseif(isset($photos))
        {{ $photos->links('pagination::bootstrap-5') }}
    @elseif(isset($users))
        {{ $users->links('pagination::bootstrap-5') }}
    @elseif(isset($albumsCategory))
        {{ $albumsCategory->links('pagination::bootstrap-5') }}
    @endif
</div>
