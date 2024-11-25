import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { Link, useForm } from "@inertiajs/react";

const EditCategory = ({ category, categories }) => {
    const { data, setData, patch, errors, processing } = useForm({
        name: category.name,
        description: category.description || '',
        parent_id: category.parent_id || null,
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

            <div className="row">
                <div className="col-md-8">
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
                            <label htmlFor="parent_id">Categoria padre</label>
                            {/* <input type="number" name="parent_id" id="parent_id" className="form-control"
                                value={data.parent_id || ''} onChange={handleInputChange} placeholder="Parent ID" /> */}
                            <select name="parent_id" id="parent_id" className="form-control" value={data.parent_id || ''} onChange={handleInputChange}>
                                <option value={null}>Nessuna</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Modifica'}</button>
                            <Link href={route('categories.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )

}

export default EditCategory;