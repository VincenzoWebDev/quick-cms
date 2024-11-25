import { AlertErrors, InputErrors } from "@/components/Front/Index";
import EcommerceLayout from "@/Layouts/EcommerceLayout";
import { useForm, usePage } from "@inertiajs/react"

const Login = ({ pages }) => {
    const { user_auth, flash } = usePage().props;
    const { post, data, setData, errors } = useForm(
        {
            email: '',
            password: '',
        }
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.profile.login'));
    }
    return (
        <EcommerceLayout pages={pages}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                        <AlertErrors message={flash.message} />
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-3">Accedi</h3>
                                <InputErrors errors={errors} />
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <input type="email" name="email" id="typeEmailX-2" className="form-control" placeholder="Email" value={data.email} onChange={handleChange} />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" name="password" id="typePasswordX-2" className="form-control" placeholder="Password" autoComplete="off" value={data.password} onChange={handleChange} />
                                    </div>

                                    <div className="form-check d-flex justify-content-start mb-4">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form1Example3" />
                                        <label htmlFor="form1Example3" className="form-check-label">Ricorda la password </label>
                                    </div>

                                    <button className="btn btn-primary w-100 text-uppercase shadow" type="submit">Login</button>

                                    <hr className="my-4" />

                                    <span className="btn btn-primary w-100 mb-2 text-uppercase shadow" style={{ backgroundColor: "#dd4b39" }}>
                                        <i className="fab fa-google me-2"></i> Accedi con google</span>
                                    <span className="btn btn-primary w-100 text-uppercase shadow" style={{ backgroundColor: "#3b5998" }}>
                                        <i className="fab fa-facebook-f me-2"></i>Accedi con facebook</span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    )
}

export default Login