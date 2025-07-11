import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utlis/api';
import useStore from '../../zustand/store.jsx';

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const user = useStore(state => state.user);

    useEffect(() => {
        async function initiatePayment() {
            try {
                if (!user) {
                    alert('User not logged in.');
                    return navigate('/login');
                }

                // Fetch order info
                const { data: order } = await api.get(`/orders/${orderId}`);

                // Initiate payment
                const { data } = await api.post('/payments/khalti/initiate', {
                    amount: order.totalPrice * 100,
                    orderId: order._id,
                    return_url: `${window.location.origin}/payment-success?orderId=${order._id}`,
                    user: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                    },
                });

                // Redirect to Khalti payment page
                window.location.href = data.payment_url;
            } catch (error) {
                alert('Failed to initiate payment. Please try again.');
                navigate('/cart');
            }
        }

        initiatePayment();
    }, [orderId, navigate, user]); // ✅ include user as a dependency

    return <p className="text-center mt-10">Redirecting to payment gateway...</p>;
};

export default PaymentPage;
