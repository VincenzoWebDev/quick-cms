import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Admin/Layout';
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
    <Layout>
      <Head title="Forgot Password" />

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-7 col-sm-9">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-lock"></span>
                </div>
                <h3 className="text-center mb-4">Hai dimenticato la password?</h3>
                <InputErrors errors={errors} />
                <div className="mb-4 text-sm text-gray-600 text-center">
                  Hai dimenticato la password? Nessun problema. Comunicaci il tuo indirizzo email e ti invieremo un link
                  per reimpostare la password che ti permetterà di sceglierne una nuova.
                </div>

                {status && <div className="mb-4 text-success">{status}</div>}

                <form onSubmit={submit}>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="form-control rounded-left"
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="Email"
                  />

                  <div className="form-group">
                    <button className="btn btn-primary rounded submit p-3 px-5" disabled={processing}>
                      Invia Link per Reimpostare la Password
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
