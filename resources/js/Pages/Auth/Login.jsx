import AuthLayout from '@/Layouts/AuthLayout';
import InputErrors from '@/components/Admin/InputErrors';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const Login = () => {
  const { demo_mode } = usePage().props;
  const { data, setData, post, errors, processing } = useForm({
    email: demo_mode == 1 ? 'demo@quickcms.test' : '',
    password: demo_mode == 1 ? 'demo1234' : '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <AuthLayout
      title="Bentornato nel pannello"
      subtitle="Accedi per gestire contenuti, ecommerce e impostazioni del tuo Quick CMS."
      icon="fa-right-to-bracket"
      alternateAction={
        <p>
          Non hai un account?{' '}
          <Link href={route('register')} className="auth-link">
            Registrati
          </Link>
        </p>
      }
    >
      <Head title="Login" />
      <InputErrors errors={errors} />

      <form onSubmit={handleSubmit} className="auth-form-grid">
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
            onChange={handleChange}
            required
            autoComplete="email"
            autoFocus
            placeholder="nome@dominio.it"
            disabled={demo_mode == 1 ? true : false}
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
            autoComplete="current-password"
            placeholder="Inserisci password"
            value={data.password}
            onChange={handleChange}
            disabled={demo_mode == 1 ? true : false}
          />
        </div>

        <div className="auth-form-row">
          <label className="form-check auth-check-wrap" htmlFor="remember">
            <input
              type="checkbox"
              className="form-check-input"
              name="remember"
              id="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="form-check-label">Ricordami</span>
          </label>

          <Link className="auth-link" href={route('password.request')}>
            Password dimenticata?
          </Link>
        </div>

        <button className="btn cb-primary auth-submit-btn" disabled={processing}>
          Accedi
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
