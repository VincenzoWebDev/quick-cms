import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { useForm, Link } from '@inertiajs/react';

const Confirm = () => {
    const { data, setData, post, errors } = useForm({
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
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
                                <h3 className="text-center mb-4">Conferma la tua password per continuare</h3>
                                <InputErrors errors={errors} />

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input id="password" type="password" className="form-control"
                                            name="password" required autoComplete="current-password" placeholder="Password" value={data.password} onChange={handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-primary rounded submit p-3 px-5">
                                            Conferma Password
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

export default Confirm;