import Layout from "@/Layouts/Admin/Layout";

const Verify = () => {
    return (
        <Layout>
            <section className="ftco-section">
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6 text-center mb-5">
                            <h2 class="heading-section">Verifica la tua mail</h2>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-md-6 col-lg-5">
                            <div class="login-wrap p-4 p-md-5">
                                {/* @if (session('resent'))
                                <div class="alert alert-success" role="alert">
                                    {{ __('A fresh verification link has been sent to your email address.') }}
                                </div>
                                @endif */}

                                {/* {{ __('Before proceeding, please check your email for a verification link.') }}
                                {{ __('If you did not receive the email') }}, */}
                                <form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
                                    {/* @csrf */}
                                    <button type="submit"
                                        class="btn btn-link p-0 m-0 align-baseline">clicca qui per richiederne un'altra</button>.
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Verify;