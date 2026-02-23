import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { InputErrors } from '@/components/Admin/Index';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route('password.store'));
  };

  return (
    <AuthLayout
      title="Imposta una nuova password"
      subtitle="Crea una nuova password sicura per tornare nel pannello."
      icon="fa-unlock-keyhole"
      infoMessage="Compila i campi qui sotto per completare il reset."
    >
      <Head title="Reset Password" />
      <InputErrors errors={errors} />

      <form onSubmit={submit} className="auth-form-grid">
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="form-control"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
            placeholder="nome@dominio.it"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Nuova password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="form-control"
            autoComplete="new-password"
            onChange={(e) => setData('password', e.target.value)}
            placeholder="Inserisci nuova password"
            required
          />
        </div>

        <div>
          <label htmlFor="password_confirmation" className="form-label">
            Conferma password
          </label>
          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="form-control"
            autoComplete="new-password"
            onChange={(e) => setData('password_confirmation', e.target.value)}
            placeholder="Ripeti nuova password"
            required
          />
        </div>

        <button className="btn cb-primary auth-submit-btn" disabled={processing}>
          Reimposta password
        </button>
      </form>
    </AuthLayout>
  );
}
