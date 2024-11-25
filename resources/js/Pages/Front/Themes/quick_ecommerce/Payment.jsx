import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { CheckoutHeader } from '@/components/Front/Index';
import EcommerceLayout from '@/Layouts/EcommerceLayout';

// Carica l'oggetto Stripe con la tua chiave pubblica
const stripePromise = loadStripe('pk_test_51Q7CRl2NcYBwuLk0LYV9JXnFiaQBlJOHffKO7zSOIGKsydAvIg9zxxsyBZ8nTMZvnwWxgZLUHPzZVZPjKKp6k65o00cjuymXxU');

const Payment = ({ orderId }) => {
    return (
        <EcommerceLayout>
            <CheckoutHeader />
            <Elements stripe={stripePromise}>
                <PaymentForm orderId={orderId} />
            </Elements>
        </EcommerceLayout>
    );
};

export default Payment;
