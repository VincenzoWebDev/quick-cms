@extends('layouts.auth')

@section('container')
    <div class="row justify-content-center">
        <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">{{ __('Login') }}</h2>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
            <div class="login-wrap p-4 p-md-5">
                <div class="icon d-flex align-items-center justify-content-center">
                    <span class="fa fa-lock"></span>
                </div>
                <h3 class="text-center mb-4">Hai un account?</h3>
                <form action="{{ route('login') }}" class="login-form" method="POST">
                    @csrf

                    <div class="mb-3">
                        <input id="email" type="email"
                            class="form-control rounded-left @error('email') is-invalid @enderror" name="email"
                            value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="Email">

                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                            name="password" required autocomplete="current-password" placeholder="Password">

                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="form-group d-md-flex">
                        <div class="w-50">
                            <label class="checkbox-wrap checkbox-primary" for="remember">
                                <input type="checkbox" name="remember" id="remember"
                                    {{ old('remember') ? 'checked' : '' }}>
                                <span class="checkmark"></span>
                                {{ __('Remember Me') }}
                            </label>
                        </div>
                        <div class="w-50 text-end">
                            @if (Route::has('password.request'))
                                <a class="" href="{{ route('password.request') }}">
                                    {{ __('Password dimenticata?') }}
                                </a>
                            @endif
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary rounded submit p-3 px-5">
                            {{ __('Login') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
