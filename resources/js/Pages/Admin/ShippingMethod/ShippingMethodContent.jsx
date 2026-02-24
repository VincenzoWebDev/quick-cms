import AlertErrors from "@/components/Admin/AlertErrors";
import { ButtonDelete, ButtonEdit, SectionHeader } from "@/components/Admin/Index";
import Layout from "@/Layouts/Admin/Layout";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const ShippingMethodContent = ({ shippingMethods, flash }) => {
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleDelete = (e) => {
        e.preventDefault();
        const shippingId = e.target.id;
        router.delete(route('shipping-methods.destroy', shippingId), {
            onSuccess: () => {
                setMessage({ tipo: 'success', testo: `Spedizione ${shippingId} cancellata correttamente` });
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante la cancellazione della spedizione ${shippingId}` });
            }
        });
    }

    const totalShippingMethods = shippingMethods.length;
    const freeShippingMethods = shippingMethods.filter((shipping) => Number(shipping.price) <= 0).length;
    const paidShippingMethods = totalShippingMethods - freeShippingMethods;

    return (
        <Layout>
            <SectionHeader
                title="Gestione spedizioni"
                subtitle="Configura metodi, costi e tempi di consegna disponibili."
                primaryAction={
                    <Link href={route('shipping-methods.create')} className="btn cb-primary">
                        Inserisci una nuova spedizione
                    </Link>
                }
            />
            <AlertErrors message={message} />

            <div className="card shadow-2-strong">
                <div className="card-body">
                    <div className="admin-overview-strip">
                        <div className="admin-overview-item">
                            <small>Metodi totali</small>
                            <strong>{totalShippingMethods}</strong>
                        </div>
                        <div className="admin-overview-item">
                            <small>Spedizioni gratuite</small>
                            <strong>{freeShippingMethods}</strong>
                        </div>
                        <div className="admin-overview-item">
                            <small>Spedizioni a pagamento</small>
                            <strong>{paidShippingMethods}</strong>
                        </div>
                    </div>

                    <div className="admin-list-toolbar">
                        <p className="mb-0">Controlla costi e tempi di consegna in modo uniforme e rapido.</p>
                    </div>

                    <div className="table-responsive admin-table-shell">
                        <table className="table table-hover mb-0 admin-table shipping-table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Prezzo spedizione</th>
                                    <th scope="col">Tempo di consegna</th>
                                    <th scope="col">Descrizione</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    shippingMethods.length > 0 ? (
                                        shippingMethods.map(shipping => (
                                            <tr key={shipping.id} className="align-middle">
                                                <td scope="row" className="col-1">#{shipping.id}</td>
                                                <td scope="row" className="col-2">{shipping.name}</td>
                                                <td scope="row" className="col-2">
                                                    <span className="shipping-price-pill">EUR {shipping.price}</span>
                                                </td>
                                                <td scope="row" className="col-2">
                                                    <span className="shipping-days-pill">{shipping.delivery_time} giorni</span>
                                                </td>
                                                <td scope="row" className="col-2 shipping-description-cell">{shipping.description}</td>
                                                <td scope="row" className="col-2 text-center">
                                                    <div className="action-buttons justify-content-center">
                                                        <Link href={route('shipping-methods.edit', shipping.id)} className="action-icon-link">
                                                            <ButtonEdit />
                                                        </Link>
                                                        <form onSubmit={handleDelete} className="d-inline" id={shipping.id}>
                                                            <ButtonDelete />
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='6' className='text-center py-4'>Non ci sono spedizioni</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ShippingMethodContent;
