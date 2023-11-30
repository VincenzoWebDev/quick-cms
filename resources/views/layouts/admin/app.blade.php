@include('partials.admin._header')

<body>

    <div class="wrapper">

        <div class="body-overlay"></div>

        <!-- Sidebar  -->
        @component('components.sidebar')
        @endcomponent

        <!-- Page Content  -->
        <div id="content">

            <!-- Topbar  -->
            @component('components.topbar')
            @endcomponent
            
            <div class="main-content">
                @yield('container')
            </div>

            @component('components.copyright')
            @endcomponent
        </div>
    </div>

    @include('partials.admin._footer')

    @yield('scripts')

</body>

</html>
