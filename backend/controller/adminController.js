import User from '../models/user.model.js';
import Order from '../models/order.model.js';
import Event from '../models/Event.model.js';

// GET all users (optional: filter by role)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // hide passwords
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// GET all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email')
            .populate('items.foodItem', 'name price');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// GET all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ startDate: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch events' });
    }
};

// CREATE event
export const createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create event' });
    }
};

// UPDATE event
export const updateEvent = async (req, res) => {
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Event not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update event' });
    }
};

// DELETE event
export const deleteEvent = async (req, res) => {
    try {
        const deleted = await Event.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete event' });
    }
};
