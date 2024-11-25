import { AlertErrors, CheckoutHeader } from "@/components/Front/Index";
import FrontLayout from "@/Layouts/FrontLayout";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Cart = ({ pages, cartItems, flash }) => {
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const deleteCartItem = (id) => {
        router.delete(route('cart.delete', id), {
            onSuccess: () => {
                setMessage({ tipo: 'success', testo: `Prodotto ${id} rimosso correttamente` });
            },
            onError: () => {
                setMessage({ tipo: 'danger', testo: `Errore durante la rimozione del prodotto ${id}` });
            }
        });
    }
    const handleCheckout = (e) => {
        e.preventDefault();
        router.get(route('checkout.index'),
            {
                onSuccess: () => {
                    setMessage(message);
                },
            });
    }
    return (
        <FrontLayout pages={pages}>
            <CheckoutHeader />
            <section className="bg-light py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <AlertErrors message={message} />
                        </div>
                    </div>
                    <div className="row card mb-5 py-3">
                        <div className="col-md-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nome prodotto</th>
                                        <th>Colore</th>
                                        <th>Taglia</th>
                                        <th>Prezzo</th>
                                        <th>Quantità</th>
                                        <th>Totale</th>
                                        <th>Operazioni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="align-middle">
                                            <td className="col-3">{item.product.name}</td>
                                            <td className="col-2">{item.color}</td>
                                            <td className="col-1">{item.size}</td>
                                            <td className="col-2">€{item.price}</td>
                                            <td className="col-1">{item.quantity}</td>
                                            <td className="col-2">€{item.price * item.quantity}</td>
                                            <td className="col-1">
                                                <button className="btn btn-danger p-0" onClick={() => deleteCartItem(item.id)}>
                                                    <i className="fas fa-trash p-2" style={{ fontSize: '14px' }}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col-md-12">
                                    <h3>Total: €{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h3>
                                    <button className="btn btn-primary" onClick={(e) => handleCheckout(e)}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    )
};

export default Cart;