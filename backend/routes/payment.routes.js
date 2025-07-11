import express from 'express';
import { initiateKhaltiPayment, verifyKhaltiPayment } from '../controller/payment.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/khalti/initiate', authenticateUser, initiateKhaltiPayment);
router.post('/khalti/verify', authenticateUser, verifyKhaltiPayment);

export default router;
