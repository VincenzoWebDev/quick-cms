import { Link, useForm } from '@inertiajs/react';
import InputErrors from '@/components/Admin/InputErrors';
import Layout from '@/Layouts/Admin/Layout';

const ThemeCreate = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        path: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('themes.store'));
    };

    return (
        <Layout>
            <h2>Inserisci un nuovo tema</h2>
            <InputErrors errors={errors} />

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Nome tema</label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="Nome tema" value={data.name} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="path">Percorso</label>
                    <textarea name="path" id="path" className="form-control" placeholder="Percorso" value={data.path} onChange={handleInputChange}></textarea>
                </div>

                <div className="mb-3">
                    <button className="btn cb-primary me-3">Inserisci</button>
                    <Link href={route('themes.index')} className="btn btn-secondary">Torna indietro</Link>
                </div>
            </form>
        </Layout>
    )
}

export default ThemeCreate;