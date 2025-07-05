import FoodItem from '../models/foodItem.model.js';

// Create a new food item
export const createFoodItem = async (req, res) => {
    try {
        const { name, description, price, imageUrl, available, category } = req.body;
        const stallOwner = req.user.id; // from authenticateUser middleware

        const newFoodItem = await FoodItem.create({
            stallOwner,
            name,
            description,
            price,
            imageUrl,
            available,
            category,
        });

        res.status(201).json(newFoodItem);
    } catch (error) {
        console.error('Create FoodItem error:', error);
        res.status(500).json({ message: 'Failed to create food item' });
    }
};

// Get all food items for logged-in stall owner
export const getFoodItems = async (req, res) => {
    try {
        const stallOwner = req.user.id;

        const foodItems = await FoodItem.find({ stallOwner });

        res.status(200).json(foodItems);
    } catch (error) {
        console.error('Get FoodItems error:', error);
        res.status(500).json({ message: 'Failed to get food items' });
    }
};

// Get a single food item by id (for stall owner)
export const getFoodItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const stallOwner = req.user.id;

        const foodItem = await FoodItem.findOne({ _id: id, stallOwner });
        if (!foodItem) return res.status(404).json({ message: 'Food item not found' });

        res.status(200).json(foodItem);
    } catch (error) {
        console.error('Get FoodItem by ID error:', error);
        res.status(500).json({ message: 'Failed to get food item' });
    }
};

// Update a food item by id
export const updateFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const stallOwner = req.user.id;

        const updatedFoodItem = await FoodItem.findOneAndUpdate(
            { _id: id, stallOwner },
            req.body,
            { new: true }
        );

        if (!updatedFoodItem) return res.status(404).json({ message: 'Food item not found' });

        res.status(200).json(updatedFoodItem);
    } catch (error) {
        console.error('Update FoodItem error:', error);
        res.status(500).json({ message: 'Failed to update food item' });
    }
};

// Delete a food item by id
export const deleteFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const stallOwner = req.user.id;

        const deletedFoodItem = await FoodItem.findOneAndDelete({ _id: id, stallOwner });
        if (!deletedFoodItem) return res.status(404).json({ message: 'Food item not found' });

        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.error('Delete FoodItem error:', error);
        res.status(500).json({ message: 'Failed to delete food item' });
    }
};
