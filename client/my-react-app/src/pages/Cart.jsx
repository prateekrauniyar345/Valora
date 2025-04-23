// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../components/CartContext';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const { refreshCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5001/api/cart', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setCartItems(data.items);
        setSelectedItems(data.items.map(item => item.productId));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load cart');
        setLoading(false);
      });
  }, []);

  const handleRemove = async (productId, size, color) => {
    const res = await fetch('http://localhost:5001/api/cart/items', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ productId, size, color })
    });
    // const updated = await res.json();
    // setCartItems(updated.items);
    // setSelectedItems(prev => prev.filter(id => id !== productId));
    await fetch('http://localhost:5001/api/cart', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          setCartItems(data.items);
          setSelectedItems(data.items.map(item => item.productId));
          refreshCart(); // Updates the global cart count in Header
        });
      
  };

  const handleCheckout = () => {
    const selected = cartItems.filter(item => selectedItems.includes(item.productId));
    // For now, we just console.log. Replace with real checkout redirect
    console.log('Proceeding to checkout with:', selected);
    navigate('/checkout', { state: { items: selected } });
  };

  const toggleSelect = productId => {
    setSelectedItems(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  if (loading) return <p>Loading cart…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="cart-container">
      <h1>Your Shopping Bag</h1>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) =>
                item.productId ? (
                <li key={index} className="cart-item">
                    <img
                        src={
                            typeof item.productId.link === 'string'
                            ? item.productId.link
                            : 'https://via.placeholder.com/80x80?text=No+Image'
                        }
                        alt={item.productId.productDisplayName || 'Product image'}
                        className="cart-image"
                    />

                    <div className="cart-info">
                    <h3>{item.productId.productDisplayName}</h3>
                    <p>Color: {item.color} | Size: {item.size}</p>
                    <p>Qty: {item.qty}</p>
                    <p>
                        Price: $
                        {item.productId?.price
                        ? item.productId.price.toFixed(2)
                        : 'N/A'}
                    </p>
                    </div>
                    <button
                    className="remove-btn"
                    onClick={() =>
                        handleRemove(item.productId._id, item.size, item.color)
                    }
                    >
                    ❌ Remove
                    </button>
                </li>
                ) : null // ⬅️ if productId is missing, render nothing
            )}
            </ul>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
} 
