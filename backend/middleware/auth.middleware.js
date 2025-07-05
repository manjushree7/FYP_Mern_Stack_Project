import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

console.log('JWT_SECRET in auth middleware:', JWT_SECRET);

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
