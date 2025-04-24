// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { items } = location.state || {};

  useEffect(() => {
    setLoading(false);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items }), // ✅ Send items from frontend
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        console.error('❌ Stripe Error Response:', data);
        throw new Error(data.error || 'Stripe session failed');
      }

      window.location.href = data.url;
    } catch (err) {
      console.error('❌ Stripe Checkout Error:', err);
      alert('❌ Payment error. Please try again.');
    }
  };

  if (loading) return <p>Checking checkout status…</p>;
  if (!items || items.length === 0) return <p>Your checkout session is empty.</p>;

  const total = items.reduce(
    (sum, item) => sum + (item.productId?.price || item.price || 0) * item.qty,
    0
  );

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        {items.map((item, index) => (
          <div key={index} className="checkout-item">
            <div>
              <strong>{item.productId?.productDisplayName || item.productId?.name || item.name || 'Unnamed Product'}</strong>
              <p>Size: {item.size} | Color: {item.color} | Qty: {item.qty}</p>
            </div>
            <span>
              ${item.productId?.price ? (item.productId.price * item.qty).toFixed(2) : 'N/A'}
            </span>
          </div>
        ))}

        <div className="checkout-total">
          <strong>Total:</strong> ${total.toFixed(2)}
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
