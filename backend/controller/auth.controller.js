import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const signup = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log('JWT_SECRET in signup/login:', process.env.JWT_SECRET);


    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET not configured' });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, role });
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
};

export const login = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    console.log('JWT_SECRET in signup/login:', process.env.JWT_SECRET);


    if (!JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET not configured' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.googleAuth) {
            return res.status(400).json({ message: 'User not found or uses Google login' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '15d' });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};
