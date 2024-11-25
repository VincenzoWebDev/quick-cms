import AlertErrors from '@/components/Front/AlertErrors';
import { STORAGE_URL } from '@/constants/constants';
import { Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

const OffcanvasCart = () => {
    const { cart_items, flash } = usePage().props;
    const [message, setMessage] = useState(flash.message);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const getTotal = () => {
        let total = 0;
        if (cart_items) {
            cart_items.forEach((item) => {
                total += item.price * item.quantity;
            })
        }
        return total;
    }

    const deleteCartItem = (id) => {
        router.delete(route('cart.delete', id));
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart_items.length > 0) {
            router.get(route('checkout.index'), {}, {
                onSuccess: () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }
            });
        } else {
            setMessage({ tipo: 'warning', testo: 'Il carrello è vuoto' });
        }
    }

    return (
        <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="true" tabIndex="-1" id="offcanvasCart">
            <div className="offcanvas-header justify-content-center">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Carrello</span>
                        <span className="badge bg-primary rounded-pill">{cart_items ? cart_items.length : 0}</span>
                    </h4>
                    <AlertErrors message={message} />
                    <ul className="list-group mb-3">
                        {cart_items &&
                            cart_items.map((item) => (
                                <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}>
                                    <div className='row w-100 align-items-center'>
                                        <div className='col-3'>
                                            <img src={STORAGE_URL + item.product.image_path} alt={item.product.name} className="img-fluid" />
                                        </div>
                                        <div className='col-6'>
                                            <h6 className="my-0">{item.product.name}</h6>
                                            <p className='mt-2 mb-0'>qtà: {item.quantity}</p>
                                            <small className="text-body-secondary">{item.description}</small>
                                        </div>
                                        <div className='col-2'>
                                            <span className="text-body-secondary">&euro;{item.price}</span>
                                        </div>
                                        <div className='col-1'>
                                            <button className="btn text-red" onClick={() => deleteCartItem(item.id)}>
                                                <i className="fa-regular fa-circle-xmark"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Totale (EUR)</span>
                            <strong>&euro;{getTotal()}</strong>
                        </li>
                    </ul>

                    <button onClick={handleCheckout} className="w-100 btn btn-primary">
                        Vai al checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OffcanvasCart;
