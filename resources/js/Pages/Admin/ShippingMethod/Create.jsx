import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from '@inertiajs/react';
import { InputErrors } from "@/components/Admin/Index";

const Create = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        price: '',
        delivery_time: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('shipping-methods.store'));
    }

    return (
        <Layout>
            <h2>Inserisci una nuova spedizione</h2>
            <InputErrors errors={errors} />

            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name">Nome</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="Nome spedizione" value={data.name} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description">Descrizione</label>
                            <textarea name="description" id="description" className="form-control" placeholder="Descrizione" value={data.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price">Prezzo</label>
                            <input type="number" name="price" id="price" className="form-control" placeholder="Prezzo" value={data.price} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="delivery_time">Tempo spedizione</label>
                            <input type="number" name="delivery_time" id="delivery_time" className="form-control" placeholder="Tempo spedizione" value={data.delivery_time} onChange={handleChange} />
                            <small className="ms-1"><em>In giorni</em></small>
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3">Inserisci</button>
                            <Link href={route('shipping-methods.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    )
}
export default Create