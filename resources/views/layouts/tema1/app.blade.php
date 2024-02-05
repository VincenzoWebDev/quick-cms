@include('partials.tema1._header')

<body>

    @component('components.tema1.color-mode')
    @endcomponent

    @component('components.tema1.topbar')
    @endcomponent

    <main>

        @component('components.tema1.carousel')
        @endcomponent


        <!-- Marketing messaging and featurettes
        ================================================== -->
        <!-- Wrap the rest of the page in another container to center all the content. -->

        <div class="container">
            @yield('container')
        </div>

        @include('partials.tema1._footer')
