import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImage: { type: String }, // optional
    role: { type: String, enum: ['Customer', 'StallOwner'], default: 'Customer' },
    location: { type: String },      // optional location field
    googleAuth: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);
export default User;
