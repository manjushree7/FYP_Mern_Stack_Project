import React, { useEffect, useState } from 'react';
import useCartStore from '../zustand/cartstore.jsx';
import { toast } from 'react-toastify';
import api from '../utlis/api.js';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { fetchCart, cart, updateCartItem, removeFromCart, clearCart } = useCartStore();
    const [loading, setLoading] = useState(true);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [confirming, setConfirming] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            await fetchCart();
            setLoading(false);
        };
        load();
    }, [fetchCart]);

    const handleConfirmOrder = async () => {
        if (!deliveryAddress.trim()) {
            toast.error('Delivery address required');
            return;
        }
        if (!cart || cart.items.length === 0) {
            toast.error('Cart is empty');
            return;
        }
        setConfirming(true);
        try {
            const res = await api.post('/orders/create', { deliveryAddress });
            toast.success('Order confirmed!');
            await clearCart();
            setDeliveryAddress('');
            // Navigate to payment page with order ID
            navigate(`/payment/${res.data._id}`);
        } catch (e) {
            toast.error(e.response?.data?.message || 'Order failed');
        } finally {
            setConfirming(false);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading cart...</p>;
    if (!cart || cart.items.length === 0)
        return <p className="text-center mt-10">Your cart is empty.</p>;

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + (item.foodItem?.price || 0) * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {/* cart items, quantity controls etc. here (same as your code) */}

            <div className="mt-6">
                <label htmlFor="deliveryAddress" className="block font-semibold mb-2">
                    Delivery Address
                </label>
                <textarea
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2"
                    rows={3}
                    placeholder="Enter your delivery address"
                    disabled={confirming}
                />
            </div>

            <div className="flex justify-between items-center mt-6">
                {/* clear cart button and total price */}
                <p className="text-xl font-bold">Total: Rs. {totalPrice.toFixed(2)}</p>
            </div>

            <div className="mt-6 text-right">
                <button
                    onClick={handleConfirmOrder}
                    disabled={confirming}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {confirming ? 'Confirming...' : 'Confirm Order'}
                </button>
            </div>
        </div>
    );
};

export default CartPage;
