// controllers/dashboardController.js
import Order from '../models/order.model.js';
import FoodItem from '../models/foodItem.model.js';
import User from '../models/user.model.js';
import Event from '../models/Event.model.js';

// Get all pending orders for logged-in stall owner
export const getAllOrdersForStallOwner = async (req, res) => {
    try {
        const stallOwnerId = req.user._id;

        // Find all food items owned by this stall owner
        const foodItems = await FoodItem.find({ stallOwner: stallOwnerId }).select('_id');
        const foodItemIds = foodItems.map(item => item._id);

        // Find orders that include any of these food items and status pending
        const orders = await Order.find({
            'items.foodItem': { $in: foodItemIds },
            status: 'pending',
        })
            .populate('customer', 'name email')
            .populate('items.foodItem', 'name price');

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
};

// Get total number of stalls (users with role StallOwner)
export const getStallCount = async (req, res) => {
    try {
        const count = await User.countDocuments({ role: 'StallOwner' });
        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching stall count' });
    }
};

// Get all events sorted by startDate
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ startDate: 1 });
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching events' });
    }
};
