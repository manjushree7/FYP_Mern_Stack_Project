import express from 'express';
import { getAllOrdersForStallOwner, getStallCount, getAllEvents } from '../controller/dashboardController.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/orders/stallowner/all', authenticateUser, getAllOrdersForStallOwner);
router.get('/admin/stalls/count', authenticateUser, getStallCount);
router.get('/events', getAllEvents);

export default router;
