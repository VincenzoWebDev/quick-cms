import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from '@inertiajs/react';
import { InputErrors } from "@/components/Admin/Index";

const Create = ({ product_variants }) => {
    const { data, setData, post, errors } = useForm({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('settings.variant-values.store'));
    }

    return (
        <Layout>
            <h2>Inserisci un nuovo valore</h2>
            <InputErrors errors={errors} />

            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Nome valore</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Nome valore" value={data.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product_variant_id" className="form-label fw-bold">Nome variante</label>
                            <select name="product_variant_id" id="product_variant_id" className="form-select" onChange={handleChange} value={data.product_variant_id}>
                                <option value="">Seleziona una variante</option>
                                {product_variants.map((variant) => (
                                    <option key={variant.id} value={variant.id}>{variant.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3">Inserisci</button>
                            <Link href={route('settings.variants.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )
}
export default Create