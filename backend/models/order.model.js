import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        foodItem: { type: Schema.Types.ObjectId, ref: 'FoodItem', required: true },
        quantity: { type: Number, default: 1, min: 1 },
    }],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'completed', 'cancelled'],
        default: 'pending',
    },
    orderDate: { type: Date, default: Date.now },
    deliveryAddress: { type: String, required: true },
});

export default model('Order', OrderSchema);
