// src/pages/CheckoutPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = location.state || {};

  // ─── Check if User is Logged In ───────────────────────────
  useEffect(() => {
    fetch('http://localhost:5001/api/user/me', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  // ─── Handle Order Submission ─────────────────────────────
  const handlePlaceOrder = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items })
      });
      if (!res.ok) throw new Error('Failed to place order');
      const data = await res.json();
      alert('✅ Order placed!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Error placing order');
    }
  };

  if (loading) return <p>Checking user session…</p>;
  if (!items || items.length === 0) return <p>Your checkout session is empty.</p>;

  const total = items.reduce((sum, item) => sum + (item.productId?.price || 0) * item.qty, 0);

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        {items.map((item, index) => (
          <div key={index} className="checkout-item">
            <div>
              <strong>{item.productId?.productDisplayName}</strong>
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
          Place Order
        </button>
      </div>
    </div>
  );
}