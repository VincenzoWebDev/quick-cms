import Layout from '@/Layouts/Admin/Layout';
import InputErrors from '@/components/Admin/InputErrors';
import { Link, useForm } from '@inertiajs/react';

const Login = () => {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    }

    return (
        <Layout>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-7 col-sm-9">
                            <div className="login-wrap p-4 p-md-5">
                                <div className='text-center pb-4'>
                                    <p>Non sei registrato? <strong><Link href={route('register')} className='text-primary'>Registrati</Link></strong></p>
                                </div>
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-lock"></span>
                                </div>
                                <h3 className="text-center mb-4">Hai un account?</h3>
                                <InputErrors errors={errors} />

                                <form onSubmit={handleSubmit} className="login-form">
                                    <div className="mb-3">
                                        <input id="email" type="email"
                                            className="form-control rounded-left" name="email"
                                            value={data.email} onChange={handleChange} required autoComplete="email" autoFocus placeholder="Email" />
                                    </div>

                                    <div className="mb-3">
                                        <input id="password" type="password" className="form-control"
                                            name="password" required autoComplete="current-password" placeholder="Password" value={data.password} onChange={handleChange} />
                                    </div>

                                    <div className="form-group d-md-flex row">
                                        <div className="w-50">
                                            <label className="checkbox-wrap checkbox-primary" htmlFor="remember">
                                                <input type="checkbox" name="remember" id="remember" />
                                                <span className="checkmark"></span>
                                                Remember Me
                                            </label>
                                        </div>
                                        <div className="w-50 text-end">
                                            <Link className="" href={route('password.request')}>Password dimenticata?</Link>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary rounded submit p-3 px-5">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Login;