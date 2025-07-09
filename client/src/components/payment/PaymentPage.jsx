import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KhaltiPayment from './KhaltiPayment';
import api from '../../utlis/api';

const PaymentPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch order by ID
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${orderId}`);
                setOrder(res.data);
            } catch {
                alert('Failed to fetch order');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId, navigate]);

    if (loading) return <p className="text-center mt-10">Loading order...</p>;
    if (!order) return null;

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
            <p className="mb-6">Total: Rs. {order.totalPrice.toFixed(2)}</p>
            <KhaltiPayment orderId={order._id} amount={order.totalPrice} />
        </div>
    );
};

export default PaymentPage;
