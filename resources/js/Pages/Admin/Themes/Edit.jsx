import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { Link, useForm } from '@inertiajs/react';

const ThemeEdit = ({ theme }) => {
    const { data, setData, patch, errors } = useForm({
        name: theme.name,
        path: theme.path
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('themes.update', theme.id));
    }

    return (
        <Layout>
            <h2>Modifica tema</h2>
            <InputErrors errors={errors} />

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Nome tema</label>
                    <input type="text" name="name" id="name" className="form-control" value={data.name}
                        placeholder="Nome tema" onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="path">Percorso</label>
                    <textarea name="path" id="path" className="form-control" placeholder="Percorso" value={data.path} onChange={handleInputChange}></textarea>
                </div>

                <div className="mb-3">
                    <button className="btn cb-primary me-3">Modifica</button>
                    <Link href={route('themes.index')} className="btn btn-secondary">Torna indietro</Link>
                </div>
            </form>
        </Layout>
    )
}

export default ThemeEdit;