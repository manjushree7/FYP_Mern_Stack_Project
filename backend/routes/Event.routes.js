// routes/event.routes.js
import express from 'express';
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    addParticipant,
} from '../controller/event.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticateUser);

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

router.post('/:id/join', addParticipant);


export default router;
