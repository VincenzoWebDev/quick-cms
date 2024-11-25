import { AlertErrors, InputErrors } from "@/components/Front/Index";
import FrontLayout from "@/Layouts/FrontLayout"
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
        post(route('front.user.login.post'));
    }

    if (user_auth) {
        window.location.href = route('home');
    }
    return (
        <FrontLayout pages={pages}>
            <div className="container mb-5">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-10">
                        <AlertErrors message={flash.message} />
                        <div className="row p-3 card border rounded">
                            <div className="col-md-12 mt-1">
                                <h4>Login</h4>
                                <InputErrors errors={errors} />
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" className="form-control" placeholder="Email" value={data.email} onChange={handleChange} />
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" placeholder="Password" autoComplete="off" value={data.password} onChange={handleChange} />
                                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}

export default Login