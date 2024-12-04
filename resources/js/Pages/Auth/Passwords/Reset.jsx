import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { useForm, usePage } from '@inertiajs/react';

const Reset = () => {
    const { token, email } = usePage().props;
    const { data, setData, post, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.update'));
    }

    return (
        <Layout>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-key"></span>
                                </div>
                                <h3 className="text-center mb-4">Resetta la tua password</h3>
                                <InputErrors errors={errors} />

                                <form onSubmit={handleSubmit}>
                                    <input type="hidden" name="token" value="{{ $token }}" />

                                    <div className="mb-3">
                                        <input id="email" type="email" className="form-control"
                                            name="email" value={data.email || ''} onChange={handleChange} required autoComplete="email" autoFocus
                                            placeholder="Email" />
                                    </div>

                                    <div className="mb-3">
                                        <input id="password" type="password" className="form-control"
                                            name="password" required autoComplete="new-password" placeholder="Nuova password" value={data.password || ''} onChange={handleChange} />
                                    </div>

                                    <div className="mb-3">
                                        <input id="password-confirm" type="password" className="form-control" name="password_confirmation"
                                            required autoComplete="new-password" placeholder="Conferma password" value={data.password_confirmation || ''} onChange={handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary rounded submit p-3 px-5">
                                            Reset Password
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

export default Reset;