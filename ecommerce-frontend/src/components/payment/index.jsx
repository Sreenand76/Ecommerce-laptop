import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../../util/ApiFunctions';
import { FaCheckCircle } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const Payment = ({ amount, currency = 'inr', onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [orderStatus, setOrderStatus] = useState('placing');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setPaymentError(null);

    try {
      const clientSecret = await createPaymentIntent(amount, currency);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setPaymentError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setShowStatusModal(true);
        setLoading(false);

        // Simulate order creation
        await onSuccess(paymentIntent);
        setOrderStatus('success');

        // Wait for 2.5s then start fade out
        setTimeout(() => {
          setFadeOut(true);

          // Wait for fade-out animation to complete
          setTimeout(() => {
            setShowStatusModal(false);
            navigate('/');
          }, 500); // fade duration
        }, 2500);
      }
    } catch (err) {
      setPaymentError(err.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#1f2937] rounded p-3 border border-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  color: '#ffffff',
                  fontSize: '16px',
                  backgroundColor: '#1f2937',
                  iconColor: '#a0aec0',
                  '::placeholder': {
                    color: '#a0aec0',
                  },
                },
                invalid: {
                  color: '#e53e3e',
                },
              },
            }}
          />
        </div>

        {paymentError && (
          <div className="bg-red-100 text-red-800 px-3 py-2 rounded text-sm">
            {paymentError}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading || showStatusModal}
          className={`w-full py-2 rounded-lg transition duration-200 text-white flex justify-center items-center gap-2
            ${showStatusModal ? 'bg-green-600' : loading ? 'bg-gray-600' : 'bg-green-700 hover:bg-green-800'}
          `}
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin text-lg" />
              Processing...
            </>
          ) : showStatusModal ? (
            <>
              <FaCheckCircle className="text-xl" />
              Payment Success!
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>

      {/* Modal */}
      {showStatusModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          } bg-black/50`}
        >
          <div className="bg-gray-900 text-white p-6 rounded-lg border border-gray-700 shadow-lg flex flex-col items-center gap-4 w-full max-w-xs">
            {orderStatus === 'placing' ? (
              <>
                <ImSpinner2 className="animate-spin text-3xl text-blue-400" />
                <p className="text-sm text-gray-300">Payment successful. Placing your order...</p>
              </>
            ) : (
              <>
                <FaCheckCircle className="text-green-500 text-4xl" />
                <p className="text-lg font-semibold">Order Placed Successfully!</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
