import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const OrderSchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stallOwner: { type: Schema.Types.ObjectId, ref: 'StallOwnerProfile', required: true },
    foodItems: [{
        item: { type: Schema.Types.ObjectId, ref: 'FoodItem', required: true },
        quantity: { type: Number, default: 1, min: 1 },
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    orderDate: { type: Date, default: Date.now },
    deliveryAddress: { type: String, required: true },
});

export default model('Order', OrderSchema);
