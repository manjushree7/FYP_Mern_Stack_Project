import express from 'express';
import {
    createOrder,
    getOrderById,
    getCustomerOrders,
    getStallOwnerOrders,
} from '../controller/CreateOrder.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authenticateUser, createOrder);
router.get('/:id', authenticateUser, getOrderById);
router.get('/customer/all', authenticateUser, getCustomerOrders);
router.get('/stallowner/all', authenticateUser, getStallOwnerOrders);

export default router;
