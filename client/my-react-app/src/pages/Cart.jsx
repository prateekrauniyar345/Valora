// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../components/CartContext';
;


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

   // Discount code logic 
  function getDiscountedPrice(price, discountCode) {
    let percent = 20; // default
    if (discountCode.includes('30%')) percent = 30;
    else if (discountCode.includes('50%')) percent = 50;
    else if (discountCode.includes('70%')) percent = 70;
    return (price * (1 - percent / 100)).toFixed(2);
  }
  

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
                    <Link to={`/product/${item.productId._id}`} className="cart-product-link">
                    <img
                        src={
                            typeof item.productId.link === 'string'
                            ? item.productId.link
                            : 'https://via.placeholder.com/80x80?text=No+Image'
                        }
                        alt={item.productId.productDisplayName || 'Product image'}
                        className="cart-image"
                    />
                    </Link>

                    <div className="cart-info">
                    <h3>{item.productId.productDisplayName}</h3>
                    <p>Color: {item.color} | Size: {item.size}</p>
                    <p>Qty: {item.qty}</p>
                    <p>
                        Price: 
                        {item.productId?.discountCode ? (
                            <>
                            <span style={{ textDecoration: 'line-through', color: 'red', marginLeft: '5px' }}>
                                ${item.productId.price.toFixed(2)}
                            </span>
                            <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
                                ${getDiscountedPrice(item.productId.price, item.productId.discountCode)}
                            </span>
                            </>
                        ) : (
                            <span style={{ marginLeft: '5px' }}>
                            ${item.productId?.price?.toFixed(2)}
                            </span>
                        )}
                    </p>

                    {/* Display discount code if available */}
                    {item.productId?.discountCode && (
                    <p style={{ color: 'green', fontWeight: 'bold' }}>
                        {item.productId.discountCode.toUpperCase()} 
                    </p>
                    )}
                    </div>
                    {/* </Link> */}
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
