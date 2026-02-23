import AuthLayout from '@/Layouts/AuthLayout';
import InputErrors from '@/components/Admin/InputErrors';
import { Head, useForm, Link } from '@inertiajs/react';

const Register = () => {
  const { data, setData, post, errors } = useForm({
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <AuthLayout
      title="Crea il tuo account admin"
      subtitle="Registrati per accedere alle funzionalita di gestione del tuo Quick CMS."
      icon="fa-user-plus"
      alternateAction={
        <p>
          Hai gia un account?{' '}
          <Link href={route('login')} className="auth-link">
            Accedi
          </Link>
        </p>
      }
    >
      <Head title="Register" />
      <InputErrors errors={errors} />

      <form onSubmit={handleSubmit} className="auth-form-grid">
        <div className="row g-3">
          <div className="col-sm-6">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
              autoFocus
              placeholder="Nome"
            />
          </div>

          <div className="col-sm-6">
            <label htmlFor="lastname" className="form-label">
              Cognome
            </label>
            <input
              id="lastname"
              type="text"
              className="form-control"
              name="lastname"
              value={data.lastname}
              onChange={handleInputChange}
              required
              autoComplete="family-name"
              placeholder="Cognome"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
            placeholder="nome@dominio.it"
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            name="password"
            required
            autoComplete="new-password"
            placeholder="Inserisci password"
            value={data.password}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password-confirm" className="form-label">
            Conferma password
          </label>
          <input
            id="password-confirm"
            type="password"
            className="form-control"
            name="password_confirmation"
            required
            autoComplete="new-password"
            placeholder="Ripeti password"
            value={data.password_confirmation}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn cb-primary auth-submit-btn">
          Registrati
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
