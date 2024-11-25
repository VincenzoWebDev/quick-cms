import Layout from "@/Layouts/Admin/Layout";
import InputErrors from "@/components/Admin/InputErrors";
import { Link, useForm } from "@inertiajs/react";

const AlbumCategoryCreate = () => {
    const { data, setData, post, errors, processing } = useForm({
        category_name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('album.categories.store'));
    }

    return (
        <Layout>
            <h2>Inserisci una nuova categoria</h2>
            <InputErrors errors={errors} />

            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="category_name">Nome categoria</label>
                            <input type="text" name="category_name" id="category_name" className="form-control" placeholder="Nome categoria"
                                value={data.category_name} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso' : 'Inserisci'}</button>
                            <Link href={route('album.categories.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )
}

export default AlbumCategoryCreate;