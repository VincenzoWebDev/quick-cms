<nav id="sidebar" class="bg-dark active">
    <div class="sidebar-header bg-dark">
        <h3><img src="{{ asset('img/logo_thumb.png') }}" class="img-fluid" /><span>Quick CMS</span></h3>
    </div>
    <ul class="list-unstyled components">
        <li class="{{ Request::is('admin') ? 'active' : '' }}">
            <a href="{{ route('admin') }}" class="dashboard"><i
                    class="material-icons">dashboard</i><span>Dashboard</span></a>
        </li>

        <div class="small-screen navbar-display">
            <li class="dropdown d-lg-none d-md-block d-xl-none d-sm-block">
                <a href="#homeSubmenu0" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                    <i class="material-icons">notifications</i><span> 4 notification</span></a>
                <ul class="collapse list-unstyled menu" id="homeSubmenu0">
                    <li>
                        <a href="#">You have 5 new messages</a>
                    </li>
                    <li>
                        <a href="#">You're now friend with Mike</a>
                    </li>
                    <li>
                        <a href="#">Wish Mary on her birthday!</a>
                    </li>
                    <li>
                        <a href="#">5 warnings in Server Console</a>
                    </li>
                </ul>
            </li>

            <li class="d-lg-none d-md-block d-xl-none d-sm-block">
                <a href="#"><i class="material-icons">apps</i><span>apps</span></a>
            </li>

            <li class="d-lg-none d-md-block d-xl-none d-sm-block">
                <a href="#"><i class="material-icons">person</i><span>user</span></a>
            </li>

            <li class="d-lg-none d-md-block d-xl-none d-sm-block">
                <a href="#"><i class="material-icons">settings</i><span>setting</span></a>
            </li>
        </div>

        <li class="{{ Str::startsWith(request()->path(), 'admin/users') ? 'active' : '' }}">
            <a href="{{ route('users') }}" class="users"><i class="material-icons">person</i><span>users</span></a>
        </li>

        <li
            class="{{ Str::startsWith(request()->path(), 'admin/albums') || Str::startsWith(request()->path(), 'admin/photos') ? 'active' : '' }}">
            <a href="{{ route('albums') }}" class="albums"><i
                    class="material-icons">photo_library</i><span>Albums</span></a>
        </li>

        <!--<li
            class="{{ Str::startsWith(request()->path(), 'admin/photos') ? 'active' : '' }}">
            <a href="/admin/photos" class="photos"><i class="material-icons">photo</i><span>Foto</span></a>
        </li>-->

        <li class="{{ Str::startsWith(request()->path(), 'admin/categories') ? 'active' : '' }}">
            <a href="{{ route('categories.index') }}" class="themes"><i
                    class="material-icons">view_comfy</i><span>Categorie</span></a>
        </li>

        <li class="{{ Str::startsWith(request()->path(), 'admin/themes') ? 'active' : '' }}">
            <a href="{{ route('themes') }}" class="themes"><i
                    class="material-icons">color_lens</i><span>Temi</span></a>
        </li>

        <li class="{{ Str::startsWith(request()->path(), 'admin/pages') ? 'active' : '' }}">
            <a href="{{ route('pages.index') }}" class="pages"><i
                    class="material-icons">content_copy</i><span>Pagine</span></a>
        </li>

        <li class="dropdown">
            <a href="#pageSubmenu5" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="material-icons">border_color</i><span>forms</span></a>
            <ul class="collapse list-unstyled menu" id="pageSubmenu5">
                <li>
                    <a href="#">Page 1</a>
                </li>
                <li>
                    <a href="#">Page 2</a>
                </li>
                <li>
                    <a href="#">Page 3</a>
                </li>
            </ul>
        </li>

        <li class="dropdown">
            <a href="#pageSubmenu6" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <i class="material-icons">grid_on</i><span>tables</span></a>
            <ul class="collapse list-unstyled menu" id="pageSubmenu6">
                <li>
                    <a href="#">Page 1</a>
                </li>
                <li>
                    <a href="#">Page 2</a>
                </li>
                <li>
                    <a href="#">Page 3</a>
                </li>
            </ul>
        </li>

        <li class="">
            <a href="#"><i class="material-icons">date_range</i><span>copy</span></a>
        </li>

        <li class="">
            <a href="#"><i class="material-icons">library_books</i><span>Calender</span></a>
        </li>
    </ul>
</nav>
