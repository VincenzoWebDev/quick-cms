import { InputErrors } from "@/components/Admin/Index";
import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from "@inertiajs/react";

const OrderEdit = ({ order }) => {
    const { data, setData, errors, patch, processing } = useForm({ ...order });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in data.shipping_address) {
            setData({
                ...data,
                shipping_address: {
                    ...data.shipping_address, // Copia l'oggetto shipping_address esistente
                    [name]: value, // Aggiorna solo il campo modificato
                }
            });
        } else {
            setData({
                ...data,
                [name]: value, // Aggiorna i campi di primo livello (non nidificati)
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('orders.update', order.id));
    }

    return (
        <Layout>
            <h2>Modifica ordine</h2>
            <InputErrors errors={errors} />

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='row'>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="order_id" className="form-label fw-bold">Id ordine</label>
                            <input type="text" className="form-control" id="order_id" name="order_id" value={data.id} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user_id" className="form-label fw-bold">Utente</label>
                            <input type="text" className="form-control" id="user_id" name="user_id" value={data.user.name + ' ' + data.user.lastname} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="total" className="form-label fw-bold">Totale</label>
                            <input type="text" className="form-control" id="total" name="total" value={data.total} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shipping_status" className="form-label fw-bold">Stato spedizione</label>
                            <select className="form-select" id="shipping_status" name="shipping_status" value={data.shipping_status} onChange={handleInputChange}>
                                <option value="pending">In attesa</option>
                                <option value="shipped">In consegna</option>
                                <option value="delivered">Consegnato</option>
                                <option value="nothing">Nessuna spedizione</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="payment_status" className="form-label fw-bold">Stato pagamento</label>
                            <select className="form-select" id="payment_status" name="payment_status" value={data.payment_status} onChange={handleInputChange}>
                                <option value="pending">In attesa di pagamento</option>
                                <option value="failed">Fallito</option>
                                <option value="nothing">Nessun pagamento</option>
                                <option value="paid">Pagato</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label fw-bold">Indirizzo di spedizione</label>
                            <input type="text" className="form-control" id="address" name="address" value={data.shipping_address.address} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="civic" className="form-label fw-bold">Civico</label>
                            <input type="text" className="form-control" id="civic" name="civic" value={data.shipping_address.civic} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="province" className="form-label fw-bold">Provincia</label>
                            <input type="text" className="form-control" id="province" name="province" value={data.shipping_address.province} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label fw-bold">Città</label>
                            <input type="text" className="form-control" id="city" name="city" value={data.shipping_address.city} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="postal_code" className="form-label fw-bold">CAP</label>
                            <input type="text" className="form-control" id="postal_code" name="postal_code" value={data.shipping_address.postal_code} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3">
                        <button type="submit" className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Modifica'}</button>
                        <Link href={route('orders.index')} className="btn btn-secondary">Torna indietro</Link>
                    </div>
                </div>
            </form >
        </Layout >
    )
}
export default OrderEdit;