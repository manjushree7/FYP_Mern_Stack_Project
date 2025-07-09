// src/pages/StallOwnerOrders.jsx
import React, { useEffect, useState } from 'react';
import api from '../utlis/api';

const StallOwnerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders/stallowner/all');
                setOrders(res.data);
            } catch (err) {
                console.error('Failed to fetch stall owner orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading received orders...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Orders Received</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders containing your items yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 font-medium">Order #{order._id.slice(-6)}</span>
                            <span className="text-sm text-blue-600 capitalize">{order.status}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">Ordered on: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500 mb-2">Customer: {order.customer?.name} ({order.customer?.email})</p>

                        <ul className="divide-y divide-gray-200">
                            {order.items
                                .filter(i => i.foodItem?.owner === localStorage.getItem('userId')) // optional filter
                                .map((item, index) => (
                                    <li key={index} className="py-2 flex justify-between">
                                        <span>{item.foodItem?.name || 'Deleted Item'} × {item.quantity}</span>
                                    </li>
                                ))}
                        </ul>

                        <div className="mt-3 text-right font-semibold text-gray-800">
                            Total Paid: Rs. {order.totalPrice}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default StallOwnerOrders;
