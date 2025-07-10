import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utlis/api';

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function initiatePayment() {
            try {
                // Fetch order info
                const { data: order } = await api.get(`/orders/${orderId}`);

                // Initiate payment at backend to get payment_url
                const { data } = await api.post('/payments/khalti/initiate', {
                    amount: order.totalPrice * 100, // in paisa
                    orderId: order._id,
                    return_url: `${window.location.origin}/payment-success?orderId=${order._id}`,
                });

                // Redirect to Khalti hosted payment page
                window.location.href = data.payment_url;
            } catch (error) {
                alert('Failed to initiate payment. Please try again.');
                navigate('/cart');
            }
        }

        initiatePayment();
    }, [orderId, navigate]);

    return <p className="text-center mt-10">Redirecting to payment gateway...</p>;
};

export default PaymentPage;
