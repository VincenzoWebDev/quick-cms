import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { router } from '@inertiajs/react';

const PaymentForm = ({ orderId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            router.post(route('checkout.payment.success'),
                {
                    payment_method: paymentMethod,
                    orderId: orderId,
                });
        }
    };

    return (
        <section className='bg-light py-5'>
            <div className="container col-md-3">
                <div className='card p-2'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="cardElement" className="form-label">Inserisci i dettagli della tua carta di credito</label>
                            <CardElement id="cardElement" className="form-control" />
                        </div>
                        <button type="submit" disabled={!stripe} className="btn btn-primary mt-2">
                            Paga
                        </button>
                        {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PaymentForm;
