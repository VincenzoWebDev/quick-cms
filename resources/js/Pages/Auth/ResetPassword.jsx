import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
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
    <Layout>
      <Head title="Reset Password" />

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-7 col-sm-9">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-lock"></span>
                </div>
                <h3 className="text-center mb-4">Resetta la tua password</h3>
                <InputErrors errors={errors} />
                <form onSubmit={submit}>
                  <div className="mb-3">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="form-control rounded-left"
                      autoComplete="username"
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="Email"
                    />

                    <InputErrors message={errors.email} className="mt-2" />
                  </div>

                  <div className="mb-3">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      className="form-control rounded-left"
                      autoComplete="new-password"
                      onChange={(e) => setData('password', e.target.value)}
                      placeholder="Password"
                    />

                    <InputErrors message={errors.password} className="mt-2" />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      name="password_confirmation"
                      value={data.password_confirmation}
                      className="form-control rounded-left"
                      autoComplete="new-password"
                      onChange={(e) => setData('password_confirmation', e.target.value)}
                      placeholder="Conferma Password"
                    />

                    <InputErrors message={errors.password_confirmation} className="mt-2" />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary rounded submit p-3 px-5" disabled={processing}>
                      Reimposta Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
