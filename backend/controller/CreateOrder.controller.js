// controllers/CreateOrder.controller.js

import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import FoodItem from '../models/foodItem.model.js';

// Create Order
export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { deliveryAddress } = req.body;

        if (!deliveryAddress) {
            return res.status(400).json({ message: 'Delivery address is required' });
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.foodItem');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const orderItems = cart.items.map(i => ({
            foodItem: i.foodItem._id,
            quantity: i.quantity,
        }));

        const totalPrice = cart.items.reduce(
            (sum, i) => sum + i.foodItem.price * i.quantity,
            0
        );

        const order = new Order({
            customer: userId,
            items: orderItems,
            totalPrice,
            deliveryAddress,
            status: 'pending',
            orderDate: new Date(),
        });

        await order.save();

        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};

// Get Order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.foodItem');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Orders for a Customer
export const getCustomerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id })
            .populate('items.foodItem')
            .sort({ orderDate: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};

// Get Orders for a Stall Owner
export const getStallOwnerOrders = async (req, res) => {
    try {
        const stallOwnerId = req.user.id;

        const ownedItems = await FoodItem.find({ owner: stallOwnerId }).select('_id');
        const ownedItemIds = ownedItems.map(item => item._id.toString());

        const allOrders = await Order.find()
            .populate('items.foodItem')
            .populate('customer', 'name email')
            .sort({ orderDate: -1 });

        const relevantOrders = allOrders.filter(order =>
            order.items.some(item => ownedItemIds.includes(item.foodItem._id.toString()))
        );

        res.status(200).json(relevantOrders);
    } catch (error) {
        console.error('Error fetching stall owner orders:', error);
        res.status(500).json({ message: 'Failed to fetch stall owner orders' });
    }
};
