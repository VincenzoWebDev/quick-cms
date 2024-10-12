import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { Link, useForm } from "@inertiajs/react";

const EditCategory = ({ category }) => {
    const { data, setData, patch, errors } = useForm({
        name: category.name,
        description: category.description || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('categories.update', category.id));
    }

    return (
        <Layout>
            <h2>Modifica categoria</h2>

            <InputErrors errors={errors} />

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Nome categoria</label>
                    <input type="text" name="name" id="name" className="form-control"
                        value={data.name} onChange={handleInputChange} placeholder="Nome categoria" />
                </div>

                <div className="mb-3">
                    <label htmlFor="description">Descrizione</label>
                    <textarea name="description" id="description" className="form-control"
                        value={data.description} onChange={handleInputChange} placeholder="Descrizione"></textarea>
                </div>

                <div className="mb-3">
                    <button className="btn cb-primary me-3">Modifica</button>
                    <Link href={route('categories.index')} className="btn btn-secondary">Torna indietro</Link>
                </div>
            </form>
        </Layout>
    )

}

export default EditCategory;