<div class="d-flex justify-content-center mt-5">
    @if (isset($albums))
        {{ $albums->links('pagination::bootstrap-5') }}
    @endif
</div>
