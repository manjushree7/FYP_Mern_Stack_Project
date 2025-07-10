// controllers/event.controller.js
import Event from '../models/Event.model.js';

// Get all events with stallOwners populated
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('stallOwners', 'stallName location');
        res.status(200).json(events);
    } catch (error) {
        console.error('Get Events error:', error);
        res.status(500).json({ message: 'Failed to get events' });
    }
};

// Get event by ID with stallOwners populated
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('stallOwners', 'stallName location');
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        console.error('Get Event by ID error:', error);
        res.status(500).json({ message: 'Failed to get event' });
    }
};

// Create a new event
export const createEvent = async (req, res) => {
    try {
        const { name, description, location, startDate, endDate, capacity } = req.body;

        console.log('Incoming event data:', req.body);

        const newEvent = await Event.create({
            name,
            description,
            location,
            startDate,
            endDate,
            capacity,
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Create Event error:', error);
        res.status(500).json({ message: 'Failed to create event' });
    }
};

// Add a stallOwner participant to event
export const addParticipant = async (req, res) => {
    try {
        const eventId = req.params.id;
        const stallOwnerId = req.user.id;

        if (!eventId) {
            return res.status(400).json({ message: 'Event ID is required' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        console.log('Event fetched:', event);
        console.log('Event capacity:', event.capacity);
        console.log('Event stallOwners:', event.stallOwners);
        console.log('Authenticated user ID:', req.user?.id);


        // Check capacity
        if (event.stallOwners.length >= event.capacity) {
            return res.status(400).json({ message: 'Event capacity full' });
        }

        // Check if user already joined
        const alreadyJoined = event.stallOwners.some(id => id.toString() === stallOwnerId);
        if (alreadyJoined) {
            return res.status(400).json({ message: 'User already a participant' });
        }

        // Add user to stallOwners array
        event.stallOwners.push(stallOwnerId);

        // Save updated event
        await event.save();

        return res.json({ message: 'Successfully joined event', event });
    } catch (error) {
        console.error('Add Participant error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete event by ID
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

// Update event by ID
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
