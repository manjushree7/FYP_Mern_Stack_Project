import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const StallOwnerProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // link to User
    stallName: { type: String, required: true },
    location: { type: String, required: true },
    contactNumber: { type: String },
    foodItems: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }],
    eventsParticipating: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    createdAt: { type: Date, default: Date.now },
    profileImage: { type: String }, // optional
});

export default model('StallOwnerProfile', StallOwnerProfileSchema);
