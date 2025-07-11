import express from 'express';
import { getAllUsers, getAllOrders, getAllEvents, createEvent, updateEvent, deleteEvent } from '../controller/adminController.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protect all admin routes
router.use(authenticateUser);

// User Management
router.get('/users', getAllUsers);

// Orders View
router.get('/orders', getAllOrders);

// Event Management
router.get('/events', getAllEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
