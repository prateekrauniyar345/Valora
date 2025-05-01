// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate }   from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const navigate              = useNavigate();
  const { state }             = useLocation();
  const items                 = state?.items || [];

  useEffect(() => {
    // If someone navigates here without items, bounce them back
    if (!items.length) {
      navigate('/', { replace: true });
    } else {
      setLoading(false);
    }
  }, [items, navigate]);

  // Build the minimal shape Stripe wants
  const buildPayloadItems = () =>
    items.map(({ productId, qty }) => ({
      name:     productId.productDisplayName,
      price:    productId.price,   // must be a number
      quantity: qty,               // must be > 0
    }));

  const handlePlaceOrder = async () => {
    setError(null);
    const payloadItems = buildPayloadItems();

    try {
      const res = await fetch(
        'http://localhost:5001/api/checkout/create-checkout-session',
        {
          method:      'POST',
          headers:     { 'Content-Type': 'application/json' },
          credentials: 'include',
          body:        JSON.stringify({ items: payloadItems }),
        }
      );

      // if not signed in, redirect to login
      if (res.status === 401) {
        return navigate('/login', { replace: true });
      }

      // error from Stripe endpoint?
      if (!res.ok) {
        const text = await res.text();
        console.error('❌ Stripe Error Response:', res.status, text);
        throw new Error(text || `HTTP ${res.status}`);
      }

      const { url } = await res.json();
      // send user over to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error('❌ Stripe Checkout Error:', err);
      setError('Payment failed. Please try again.');
    }
  };

  if (loading) return <p>Loading checkout…</p>;

  // calculate total
  const total = items.reduce(
    (sum, { productId, qty }) => sum + productId.price * qty,
    0
  );

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {error && <p className="error">{error}</p>}

      <div className="checkout-summary">
        {items.map((item, i) => (
          <div key={i} className="checkout-item">
            <div>
              <strong>{item.productId.productDisplayName}</strong>
              <p>
                Size: {item.size} | Color: {item.color} | Qty: {item.qty}
              </p>
            </div>
            <span>${(item.productId.price * item.qty).toFixed(2)}</span>
          </div>
        ))}

        <div className="checkout-total">
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>

        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
