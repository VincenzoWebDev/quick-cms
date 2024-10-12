import AlertErrors from "@/components/Admin/AlertErrors";
import Layout from "@/Layouts/Admin/Layout";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

const OrdersContent = ({ orders, flash }) => {
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);
    return (
        <Layout>
            <h2>Gestione ordini</h2>
            <AlertErrors message={message} />

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
                                    <th scope="col">Id utente</th>
                                    <th scope="col">Totale</th>
                                    <th scope="col">Stato</th>
                                    <th scope="col">Stato pagamento</th>
                                    <th scope="col">Metodo di spedizione</th>
                                    <th scope="col" className="text-center">Operazioni</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.length > 0 ? (
                                        orders.map(order => (
                                            <tr key={order.id}>
                                                <th scope="row" className='col-1'>
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input className="form-check-input" type="checkbox" />
                                                    </div>
                                                </th>
                                                <td scope="row" className="col-1">{order.id}</td>
                                                <td scope="row" className="col-1">{order.user_id}</td>
                                                <td scope="row" className="col-1">{order.total}</td>
                                                <td scope="row" className="col-2">{order.status}</td>
                                                <td scope="row" className="col-2">{order.payment_status}</td>
                                                <td scope="row" className="col-2">{order.shipping_method.name}</td>
                                                <td scope="row" className="col-2">
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                                        {/* <Link href={route('orders.show', order.id)} className="btn cb-primary mb-3">Dettagli</Link> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan='9' className='text-center'>Non ci sono ordini</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default OrdersContent;