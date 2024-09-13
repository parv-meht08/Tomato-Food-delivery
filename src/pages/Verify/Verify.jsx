import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(search);
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const { data } = await axios.post(
                    'http://localhost:5000/api/orders/verify-order',
                    {
                        orderId,
                        success,
                    }
                );
                
                if (data.success) {
                    alert('Payment successful!');
                    navigate('/orders');
                } else {
                    alert('Payment verification failed: ' + data.message);
                    navigate('/cart');
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                alert('Error while verifying payment. Please try again later.');
                navigate('/cart');
            }
        };

        verifyPayment();
    }, [orderId, success, navigate]);

    return (
        <div>
            <h1>Verifying Payment...</h1>
        </div>
    );
};

export default Verify;
