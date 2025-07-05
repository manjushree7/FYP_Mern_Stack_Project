// controllers/event.controller.js
import Event from '../models/Event.model.js';

// Create Event
export const createEvent = async (req, res) => {
    try {
        const { name, description, location, date } = req.body;
        const newEvent = await Event.create({ name, description, location, date });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Create Event error:', error);
        res.status(500).json({ message: 'Failed to create event' });
    }
};

// Get All Events
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('participants', 'stallName location');
        res.status(200).json(events);
    } catch (error) {
        console.error('Get Events error:', error);
        res.status(500).json({ message: 'Failed to get events' });
    }
};

// Get Single Event by ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('participants', 'stallName location');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        console.error('Get Event by ID error:', error);
        res.status(500).json({ message: 'Failed to get event' });
    }
};

// Update Event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Update Event error:', error);
        res.status(500).json({ message: 'Failed to update event' });
    }
};

// Delete Event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Delete Event error:', error);
        res.status(500).json({ message: 'Failed to delete event' });
    }
};

// Add StallOwner to Event participants
export const addParticipant = async (req, res) => {
    try {
        const { eventId, stallOwnerId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (!event.participants.includes(stallOwnerId)) {
            event.participants.push(stallOwnerId);
            await event.save();
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Add Participant error:', error);
        res.status(500).json({ message: 'Failed to add participant' });
    }
};
