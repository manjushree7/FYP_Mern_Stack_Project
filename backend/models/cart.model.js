// models/cart.model.js
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
    quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    items: [CartItemSchema],
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Cart', CartSchema);
