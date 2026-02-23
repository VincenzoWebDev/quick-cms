import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputErrors from '@/components/Admin/InputErrors';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    return (
        <AuthLayout
            title="Conferma identita"
            subtitle="Per accedere a quest'area protetta devi confermare la tua password."
            icon="fa-lock"
        >
            <Head title="Confirm Password" />

            <InputErrors errors={errors} />

            <form onSubmit={submit} className="auth-form-grid">
                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="form-control"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoFocus
                        autoComplete="current-password"
                        placeholder="Inserisci password"
                    />
                </div>

                <button className="btn cb-primary auth-submit-btn" disabled={processing}>
                    Conferma password
                </button>
            </form>
        </AuthLayout>
    );
}
