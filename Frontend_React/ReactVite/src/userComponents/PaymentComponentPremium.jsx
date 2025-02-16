import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const PaymentComponentPremium = () => {
  const URL = config.API_URL;
  const navigate = useNavigate();

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrderAndOpenPayment = async () => {
    try {
      const orderResponse = await axios.post(`${URL}/payment/create-order`, {
        amount: 20000 * 100,
        currency: "INR",
      });

      const { order_id } = orderResponse.data;

      const options = {
        key: "rzp_test_uDTjqNOhY3Rzjo",
        name: "CVAuction Premium",
        description: "Premium Plan Payment",
        order_id: order_id,
        amount: 20000 * 100,
        handler: async (response) => {
          try {
            const paymentData = {
              paymentNo: 0,
              uid: JSON.parse(localStorage.getItem('user')).uid,
              transactionTime: new Date().toISOString(),
              amt: 20000,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              planType: 'premium',
            };

            await axios.post(`${URL}/DepositPlans`, paymentData);
            alert('Payment Successful! Premium plan details have been saved.');
          } catch (error) {
            console.error('Error saving payment:', error);
            alert('Error saving payment details.');
          }
        },
        prefill: {
          name: "CV Auction",
          email: "cv@example.com",
          contact: "1100900009",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#28a745",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on('payment.failed', (response) => {
        alert(`Payment failed: ${response.error.description}`);
      });

      rzp1.open();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('Error creating order or fetching user details.');
    }
  };

  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js')
      .catch(() => alert("Failed to load Razorpay SDK"));
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <button
        id="rzp-button1"
        style={{
          backgroundColor: '#28a745',
          color: 'white',
          fontSize: '1.5rem',
          padding: '1rem 3rem',
          borderRadius: '50px',
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0px 10px 20px rgba(0, 0, 0, 0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.2)';
        }}
        onClick={createOrderAndOpenPayment}
      >
        Pay ₹20,000
      </button>
    </div>
  );
};

export default PaymentComponentPremium;
