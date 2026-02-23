import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { InputErrors } from '@/components/Admin/Index';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <AuthLayout
      title="Recupero password"
      subtitle="Ti inviamo un link per impostare una nuova password in modo sicuro."
      icon="fa-key"
      infoMessage="Inserisci l'email associata al tuo account amministratore."
    >
      <Head title="Forgot Password" />
      <InputErrors errors={errors} />

      {status && <div className="alert alert-success mb-3">{status}</div>}

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
            onChange={(e) => setData('email', e.target.value)}
            placeholder="nome@dominio.it"
            required
          />
        </div>

        <button className="btn cb-primary auth-submit-btn" disabled={processing}>
          Invia link di reset
        </button>
      </form>
    </AuthLayout>
  );
}
