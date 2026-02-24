import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { CheckoutHeader } from '@/components/Front/Index';
import EcommerceLayout from '@/Layouts/EcommerceLayout';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

const Payment = ({ orderId }) => {
    return (
        <EcommerceLayout>
            <CheckoutHeader />
            {stripePromise ? (
                <Elements stripe={stripePromise}>
                    <PaymentForm orderId={orderId} />
                </Elements>
            ) : (
                <section className="py-5">
                    <div className="container">
                        <div className="alert alert-warning mb-0">
                            Configurazione pagamento non disponibile: imposta <code>VITE_STRIPE_PUBLIC_KEY</code>.
                        </div>
                    </div>
                </section>
            )}
        </EcommerceLayout>
    );
};

export default Payment;
