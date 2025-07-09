import { create } from 'zustand';
import api from '../utlis/api';

const useCartStore = create((set) => ({
    cart: { items: [] },

    fetchCart: async () => {
        try {
            const res = await api.get('/cart');
            set({ cart: res.data });
        } catch (err) {
            console.error('Fetch cart error:', err);
        }
    },

    addToCart: async (foodItemId, quantity = 1) => {
        try {
            const res = await api.post('/cart/add', { foodItemId, quantity });
            set({ cart: res.data });
        } catch (err) {
            console.error('Add to cart error:', err);
        }
    },

    updateCartItem: async (itemId, quantity) => {
        try {
            const res = await api.put('/cart/update', { itemId, quantity });
            set({ cart: res.data });
        } catch (err) {
            console.error('Update cart item error:', err);
        }
    },

    removeFromCart: async (itemId) => {
        try {
            const res = await api.delete(`/cart/remove/${itemId}`);
            set({ cart: res.data });
        } catch (err) {
            console.error('Remove cart item error:', err);
        }
    },

    clearCart: async () => {
        try {
            await api.delete('/cart/clear');
            set({ cart: { items: [] } });
        } catch (err) {
            console.error('Clear cart error:', err);
        }
    },
}));

export default useCartStore;
