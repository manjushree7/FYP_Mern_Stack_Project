import React, { useState } from 'react';
import axios from 'axios';

const paymentMethods = [
    { label: 'Khalti Wallet', value: 'KHALTI' },
    { label: 'eBanking', value: 'EBANKING' },
    { label: 'Mobile Banking', value: 'MOBILE_BANKING' },
    { label: 'Connect IPS', value: 'CONNECT_IPS' },
    { label: 'SCT', value: 'SCT' },
];

const KhaltiPayment = ({ orderId, amount }) => {
    const [selectedMethod, setSelectedMethod] = useState('KHALTI');
    const [loading, setLoading] = useState(false);

    const khaltiConfig = {
        publicKey: 'live_public_key_08353793a85b444f85bb4a7ebd814221',
        productIdentity: orderId,
        productName: 'Order Payment',
        productUrl: window.location.origin,
        eventHandler: {
            onSuccess: async (payload) => {
                try {
                    setLoading(true);
                    await axios.post('/api/payments/khalti/verify', {
                        token: payload.token,
                        amount: amount * 100,
                        orderId,
                    });
                    alert('Payment successful!');
                    // TODO: redirect or update UI here
                } catch (error) {
                    alert('Payment verification failed.');
                } finally {
                    setLoading(false);
                }
            },
            onError: () => {
                alert('Payment failed or cancelled.');
            },
            onClose: () => {
                console.log('Khalti widget closed');
            },
        },
        paymentPreference: [selectedMethod],
    };

    const checkout = new window.KhaltiCheckout(khaltiConfig);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Complete Your Payment</h2>

            <p className="mb-4 text-gray-600">Amount to pay: <span className="font-bold">NPR {amount.toFixed(2)}</span></p>

            <label htmlFor="payment-method" className="block mb-2 font-medium text-gray-700">
                Choose Payment Method
            </label>
            <select
                id="payment-method"
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                className="w-full mb-6 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                {paymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                        {method.label}
                    </option>
                ))}
            </select>

            <button
                disabled={loading}
                onClick={() => checkout.show({ amount: amount * 100 })}
                className={`w-full py-3 text-white font-semibold rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    } transition`}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default KhaltiPayment;
