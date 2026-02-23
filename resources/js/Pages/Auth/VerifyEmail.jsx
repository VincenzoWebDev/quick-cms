import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title="Verifica la tua email"
            subtitle="Attiva il tuo account confermando l'indirizzo email."
            icon="fa-envelope-circle-check"
            infoMessage="Ti abbiamo inviato un link di verifica: controlla la tua casella email."
        >
            <Head title="Email Verification" />

            {status === 'verification-link-sent' && (
                <div className="alert alert-success mb-3">
                    Nuovo link di verifica inviato con successo.
                </div>
            )}

            <form onSubmit={submit} className="auth-form-grid">
                <button className="btn cb-primary auth-submit-btn" disabled={processing}>
                    Reinvia email di verifica
                </button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="btn btn-outline-secondary auth-submit-btn"
                >
                    Logout
                </Link>
            </form>
        </AuthLayout>
    );
}
