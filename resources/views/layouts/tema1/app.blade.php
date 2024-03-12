@include('partials.tema1._header')

<body>
    @inertia

    @component('components.tema1.color-mode')
    @endcomponent

    {{-- @component('components.tema1.topbar')
    @endcomponent --}}


        {{-- @component('components.tema1.carousel')
        @endcomponent --}}

        {{-- <div class="container">
            @yield('container')
        </div> --}}
        
        {{-- <x-tema1.copyright /> --}}

    @include('partials.tema1._footer')

    @yield('scripts')

</body>

</html>
