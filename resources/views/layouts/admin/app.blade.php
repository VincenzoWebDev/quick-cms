@include('partials.admin._header')

<body>
    {{-- <div class="wrapper">

        <div class="body-overlay"></div>

        <!-- Sidebar  -->
        <x-admin.sidebar />

        <!-- Page Content  -->
        <div id="content" class="active">

            <!-- Topbar  -->
            <x-admin.topbar />

            <div class="main-content"> --}}
                {{-- @yield('container') --}}
                @inertia
            {{-- </div>

            <x-admin.copyright />
        </div>
    </div> --}}

    @include('partials.admin._footer')

    @yield('scripts')

</body>

</html>
