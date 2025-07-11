// src/components/payment/PaymentSuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../utlis/api';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying payment...');

  useEffect(() => {
    const pidx = searchParams.get('pidx');
    const orderId = searchParams.get('orderId');

    if (!pidx || !orderId) {
      setStatus('Invalid payment details.');
      return;
    }

    async function verifyPayment() {
      try {
        const res = await api.post('/payments/khalti/verify', { pidx });
        if (res.data.message === 'Payment verified') {
          setStatus('Payment verified successfully! Thank you for your order.');
        } else {
          setStatus(`Payment status: ${res.data.message || 'Unknown'}`);
        }
      } catch {
        setStatus('Payment verification failed or incomplete.');
      }
    }

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      <p>{status}</p>
      <button
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
