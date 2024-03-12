import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { useForm, usePage } from '@inertiajs/react';

const Email = () => {
    const { flash } = usePage().props;
    const { data, setData, post, errors } = useForm({
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    }

    return (
        <Layout>
            <section className="ftco-section">
                <div className="container">
                    {/* <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Reset Password</h2>
                        </div>
                    </div> */}
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user"></span>
                                </div>
                                <h3 className="text-center mb-4">Inserisci Email per reimpostare la password</h3>
                                <InputErrors errors={errors} />
                                {flash.status &&
                                    <div className="alert alert-success" role="alert">
                                        {flash.status}
                                    </div>}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input id="email" type="email" className="form-control"
                                            name="email" value={data.email} onChange={handleChange} required autoComplete="email" autoFocus
                                            placeholder="Email" />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary rounded submit p-3 px-5">
                                            Invia il link
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

export default Email;