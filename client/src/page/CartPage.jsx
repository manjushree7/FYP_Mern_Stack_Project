// src/page/CartPage.jsx
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

    const handleQuantityChange = async (id, qty) => {
        if (qty < 1) return;
        try {
            await updateCartItem(id, qty);
            toast.success('Cart updated');
        } catch {
            toast.error('Failed to update cart');
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeFromCart(id);
            toast.success('Item removed');
        } catch {
            toast.error('Failed to remove item');
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
            toast.success('Cart cleared');
        } catch {
            toast.error('Failed to clear cart');
        }
    };

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
            <div className="space-y-4">
                {cart.items.map(({ _id, foodItem, quantity }) => (
                    <div key={_id} className="flex items-center gap-4 border-b pb-4">
                        <img
                            src={foodItem?.imageUrl || foodItem?.image || '/placeholder.png'}
                            alt={foodItem?.name || 'Food Item'}
                            className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">{foodItem?.name || 'N/A'}</h3>
                            <p className="text-gray-600">Price: Rs. {foodItem?.price?.toFixed(2) || '0.00'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleQuantityChange(_id, quantity - 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(_id, quantity + 1)}
                                className="px-2 py-1 bg-gray-200 rounded"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={() => handleRemove(_id)}
                            className="text-red-600 font-semibold hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

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
                <button
                    onClick={handleClearCart}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    disabled={confirming}
                >
                    Clear Cart
                </button>

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
