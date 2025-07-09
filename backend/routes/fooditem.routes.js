import express from 'express';
import {
    createFoodItem,
    getFoodItems,
    getFoodItemById,
    updateFoodItem,
    deleteFoodItem,
    getAvailableFoodItems
} from '../controller/fooditem.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/public', getAvailableFoodItems);

router.use(authenticateUser); // protect all routes

router.post('/', createFoodItem);
router.get('/', getFoodItems);
router.get('/:id', getFoodItemById);
router.put('/:id', updateFoodItem);
router.delete('/:id', deleteFoodItem);

export default router;
