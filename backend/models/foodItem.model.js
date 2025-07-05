import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FoodItemSchema = new Schema({
    stallOwner: { type: Schema.Types.ObjectId, ref: 'StallOwnerProfile', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    available: { type: Boolean, default: true },
    category: { type: String },
}, { timestamps: true });

export default model('FoodItem', FoodItemSchema);
