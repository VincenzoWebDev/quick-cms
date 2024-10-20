import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import FrontLayout from '@/Layouts/FrontLayout';
import { CheckoutHeader } from '@/components/Front/Index';

// Carica l'oggetto Stripe con la tua chiave pubblica
const stripePromise = loadStripe('pk_test_51Q7CRl2NcYBwuLk0LYV9JXnFiaQBlJOHffKO7zSOIGKsydAvIg9zxxsyBZ8nTMZvnwWxgZLUHPzZVZPjKKp6k65o00cjuymXxU');

const Payment = ({ orderId }) => {
    return (
        <FrontLayout>
            <CheckoutHeader />
            <Elements stripe={stripePromise}>
                <PaymentForm orderId={orderId} />
            </Elements>
        </FrontLayout>
    );
};

export default Payment;
