import express from 'express';
import { authenticateUser } from '../middleware/auth.middleware.js';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controller/cart.controller.js';

const router = express.Router();

router.get('/', authenticateUser, getCart);
router.post('/add', authenticateUser, addToCart);
router.put('/update', authenticateUser, updateCartItem);
router.delete('/remove/:itemId', authenticateUser, removeFromCart);
router.delete('/clear', authenticateUser, clearCart);

export default router;
