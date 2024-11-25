import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from '@inertiajs/react';
import { InputErrors } from "@/components/Admin/Index";

const Create = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.layouts.store'));
    }

    return (
        <Layout>
            <h2>Inserisci un nuovo layout</h2>
            <InputErrors errors={errors} />

            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name">Nome layout</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Nome layout" value={data.name} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3">Inserisci</button>
                            <Link href={route('settings.layouts.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )
}
export default Create