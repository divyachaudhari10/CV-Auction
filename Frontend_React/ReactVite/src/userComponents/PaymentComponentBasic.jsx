import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentComponentBasic = () => {
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
    const userId = JSON.parse(localStorage.getItem('user')).uid;
    try {
      const orderResponse = await axios.post(`${URL}/payment/create-order`, {
        amount: 10000 * 100,
        currency: "INR",
      });

      const { order_id } = orderResponse.data;

      const options = {
        key: "rzp_test_uDTjqNOhY3Rzjo",
        name: "CVAuction",
        description: "Test Transaction",
        order_id: order_id,
        amount: 10000 * 100,
        handler: async (response) => {
          try {
            const paymentData = {
              paymentNo: 0,
              uid: userId,
              transactionTime: new Date().toISOString(),
              amt: 10000,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              planType: 'basic',
            };

            await axios.post(`${URL}/DepositPlans`, paymentData);
            alert('Payment Successful! Details have been saved.');

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
          color: "#3399cc",
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <button 
        id="rzp-button1" 
        onClick={createOrderAndOpenPayment} 
        className="btn btn-primary btn-lg shadow rounded-pill px-5 py-3 fs-4"
        style={{
          backgroundImage: 'linear-gradient(to right, #1e3c72, #2a5298)',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        }}
      >
        Pay ₹10,000
      </button>
    </div>
  );
};

export default PaymentComponentBasic;
