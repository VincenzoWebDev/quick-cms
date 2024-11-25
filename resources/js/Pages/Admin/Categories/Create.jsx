import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { Link, useForm } from "@inertiajs/react";

const CategoryCreate = ({ categories }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        description: '',
        parent_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    }

    return (
        <Layout>
            <h2>Inserisci una nuova categoria</h2>
            <InputErrors errors={errors} />

            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome categoria</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Nome categoria"
                                value={data.name} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descrizione</label>
                            <textarea name="description" id="description" className="form-control" placeholder="Descrizione" value={data.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="parent_id" className="form-label">Categoria padre - <span className="text-danger">Inserisci se crei una sottocategoria</span></label>
                            {/* <input type="number" name="parent_id" id="parent_id" className="form-control" placeholder="Parent ID" value={data.parent_id} onChange={handleChange} /> */}
                            <select name="parent_id" id="parent_id" className="form-control" value={data.parent_id} onChange={handleChange}>
                                <option value={null}>Nessuna</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Inserisci'}</button>
                            <Link href={route('categories.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )
}

export default CategoryCreate;