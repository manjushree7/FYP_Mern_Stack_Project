import axios from 'axios';
import Order from '../models/order.model.js';

export const verifyKhaltiPayment = async (req, res) => {
    const { token, amount, orderId } = req.body;
    if (!token || !amount || !orderId)
        return res.status(400).json({ message: 'Missing payment info' });

    try {
        const response = await axios.post(
            'https://khalti.com/api/v2/payment/verify/',
            { token, amount },
            { headers: { Authorization: `Key ${process.env.KHALTI_SECRET_KEY}` } }
        );

        if (response.data.idx) {
            const order = await Order.findById(orderId);
            if (!order) return res.status(404).json({ message: 'Order not found' });

            order.status = 'paid';
            await order.save();

            return res.json({ message: 'Payment verified', order });
        }

        res.status(400).json({ message: 'Payment verification failed' });
    } catch (error) {
        res.status(500).json({ message: 'Khalti verification error', error: error.message });
    }
};
