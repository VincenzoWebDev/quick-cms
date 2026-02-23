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
                    <div className="table-responsive admin-table-shell">
                        <table className="table table-hover mb-0 admin-table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <div className="form-check d-flex justify-content-center align-items-center">
                                            <input className="form-check-input" type="checkbox" />
                                        </div>
                                    </th>
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
                                                <th scope="row" className='col-1'>
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input className="form-check-input" type="checkbox" />
                                                    </div>
                                                </th>
                                                <td scope="row" className="col-1">{shipping.id}</td>
                                                <td scope="row" className="col-2">{shipping.name}</td>
                                                <td scope="row" className="col-2">{shipping.price}</td>
                                                <td scope="row" className="col-2">{shipping.delivery_time} giorni</td>
                                                <td scope="row" className="col-2">{shipping.description}</td>
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
                                            <td colSpan='7' className='text-center'>Non ci sono spedizioni</td>
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
