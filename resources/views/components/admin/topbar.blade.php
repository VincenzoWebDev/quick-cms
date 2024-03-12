<div class="top-navbar">
    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">

            <!--<button type="button" id="sidebarCollapse" class="d-xl-block d-lg-block d-md-none d-none">
                <span class="material-icons arrow">arrow_forward_ios</span>
            </button>-->

            <h4 class="mb-0">Dashboard</h4>

            @if (Route::has('login'))
                <div class="text-center w-100">
                    <span class="mb-0">Ciao <label class="ct-primary">{{ Auth::user()->name }}</label>, Benvenuto in
                        Quick CMS</span>
                </div>
            @endif

            <button class="d-inline-block d-lg-none ml-auto more-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <i class="fa-solid fa-ellipsis-vertical" style="color:#fff"></i>
            </button>

            <div class="navbar-collapse d-lg-block d-xl-block d-sm-none d-md-none d-none" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link" role="button" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-bell"></i>
                            <span class="notification">4</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                            <li>
                                <a href="#">Hai 5 nuovi messaggi</a>
                            </li>
                            <li>
                                <a href="#">Ora sei amico di Mike</a>
                            </li>
                            <li>
                                <a href="#">Augura buon compleanno a Mary!</a>
                            </li>
                            <li>
                                <a href="#">5 avvisi nella console del server</a>
                            </li>
                        </ul>
                    </li>
                    <!--<li class="nav-item">
                        <a class="nav-link" href="#">
                            <span class="material-icons">apps</span>
                        </a>
                    </li>-->
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="fa-solid fa-gear"></i>
                        </a>
                    </li>
                    <li class="nav-item">
                        @guest
                            @if (Route::has('login'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @endif

                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @endif
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle user" href="javascript:;" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                <i class="fa-solid fa-user"></i>
                            </a>

                            <div class="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                                aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                                                document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                    </li>
                    <li class="nav-item" style="width:max-content">
                        <a class="nav-link" href="{{ route('home') }}" target="_blank">
                            Vai al sito
                            <i class="fa-solid fa-circle-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
