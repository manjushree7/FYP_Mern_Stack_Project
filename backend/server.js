import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import foodItemRoutes from './routes/fooditem.routes.js';
import eventRoutes from './routes/Event.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import paymentRoutes from './routes/payment.routes.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/fooditems', foodItemRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);


mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to database!!");
}).catch((err) => {
    console.log(err);
});



app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');

})