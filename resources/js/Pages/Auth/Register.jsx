import Layout from '@/Layouts/Admin/Layout';
import InputErrors from '@/components/Admin/InputErrors';
import { useForm, Link } from '@inertiajs/react';

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
    <Layout>
      <section className="ftco-section">
        <div className="container">
          {/* <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Registrati</h2>
                        </div>
                    </div> */}
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="text-center pb-4">
                  <p>
                    Sei già registrato?{' '}
                    <strong>
                      <Link href={route('login')} className="text-primary">
                        Accedi
                      </Link>
                    </strong>
                  </p>
                </div>
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user"></span>
                </div>
                <h3 className="text-center mb-4">Registrati per accedere a Quick CMS</h3>
                <InputErrors errors={errors} />

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      id="name"
                      type="text"
                      className="form-control rounded-left"
                      name="name"
                      value={data.name}
                      onChange={handleInputChange}
                      required
                      autoComplete="name"
                      autoFocus
                      placeholder="Nome"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      id="lastname"
                      type="text"
                      className="form-control rounded-left"
                      name="lastname"
                      value={data.lastname}
                      onChange={handleInputChange}
                      required
                      autoComplete="lastname"
                      placeholder="Cognome"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      value={data.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      autoComplete="new-password"
                      placeholder="Password"
                      value={data.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      id="password-confirm"
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      required
                      autoComplete="new-password"
                      placeholder="Conferma password"
                      value={data.password_confirmation}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary rounded submit p-3 px-5">
                      Registrati
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
};

export default Register;
