import AlertErrors from "@/components/Admin/AlertErrors";
import { ButtonDelete, ButtonEdit } from "@/components/Admin/Index";
import { BASE_URL } from "@/constants/constants";
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
            <h2>Gestione Spedizioni</h2>
            <AlertErrors message={message} />

            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link href={route('shipping-methods.create')} className="btn cb-primary mb-3">Inserisci una nuova spedizione</Link>
                {/* {selectedRecords && selectedRecords.length > 0 &&
                    <button className='btn btn-danger mb-3' onClick={handleDeleteSelected}>Elimina selezionati</button>
                } */}
            </div>

            <div className="card shadow-2-strong" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
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
                                                    <Link href={route('shipping-methods.edit', shipping.id)} className="btn px-2">
                                                        <ButtonEdit url={BASE_URL} />
                                                    </Link>
                                                    <form onSubmit={handleDelete} className="d-inline" id={shipping.id}>
                                                        <ButtonDelete url={BASE_URL} />
                                                    </form>
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