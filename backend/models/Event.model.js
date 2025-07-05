import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    stallOwners: [{ type: Schema.Types.ObjectId, ref: 'StallOwnerProfile' }], // participants
    createdAt: { type: Date, default: Date.now },
});

export default model('Event', EventSchema);
