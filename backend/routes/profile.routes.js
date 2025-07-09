import express from 'express';
import { getProfile, upsertProfile } from '../controller/profile.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateUser, getProfile);
router.post('/', authenticateUser, upsertProfile);

export default router;
