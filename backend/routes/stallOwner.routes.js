import express from 'express';
import { upsertStallOwnerProfile, getStallOwnerProfile } from '../controller/stallOwnerProfile.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateUser, getStallOwnerProfile);
router.post('/', authenticateUser, upsertStallOwnerProfile);

export default router;
