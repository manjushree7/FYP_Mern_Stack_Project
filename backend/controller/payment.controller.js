import axios from 'axios';
import Order from '../models/order.model.js';

export const initiateKhaltiPayment = async (req, res) => {
    const { amount, orderId, return_url, user } = req.body;

    const payload = {
        return_url,
        website_url: 'http://localhost:5173',
        amount,
        purchase_order_id: orderId,
        purchase_order_name: 'ShopLocally Order',
        customer_info: {
            name: user.name,
            email: user.email,
            phone: user.phone,
        },
    };

    try {
        const response = await axios.post(
            `${process.env.KHALTI_BASE_URL}/epayment/initiate/`,
            payload,
            {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({
            payment_url: response.data.payment_url,
            pidx: response.data.pidx,
        });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
};

export const verifyKhaltiPayment = async (req, res) => {
    const { pidx } = req.body;

    try {
        const response = await axios.post(
            `${process.env.KHALTI_BASE_URL}/epayment/lookup/`,
            { pidx },
            {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                },
            }
        );

        const data = response.data;

        if (data.status === 'Completed') {
            const order = await Order.findById(data.purchase_order_id);
            if (!order) return res.status(404).json({ message: 'Order not found' });

            order.status = 'paid';
            await order.save();

            return res.status(200).json({ message: 'Payment verified', order });
        }

        res.status(400).json({ message: 'Payment not completed' });
    } catch (error) {
        res.status(500).json({ message: 'Khalti verification error', error: error.response?.data || error.message });
    }
};
