// src/pages/Cart.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css';
import { useCart } from '../components/CartContext';
import API_BASE from '../components/api';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading,  setLoading ] = useState(true);
  const [error,    setError   ] = useState(null);
  const navigate               = useNavigate();
  const { cartCount, refreshCart } = useCart();

  // fetch + populate cart items
  const loadCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/cart`, {
      // const res = await fetch('http://localhost:5001/api/cart', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to load cart');
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  // on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // remove one item then reload both items & count
  const handleRemove = async (productId, size, color) => {
    try {
      const res = await fetch(`${API_BASE}/api/cart/items`, {
      // const res = await fetch('http://localhost:5001/api/cart/items', {
        method: 'DELETE',
        headers: { 'Content-Type':'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, size, color })
      });
      if (!res.ok) throw new Error('Failed to remove');
      await refreshCart();
      await loadCart();
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Could not remove item');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { items: cartItems } });
  };

  if (loading) return <p className="empty">Loading cart…</p>;
  if (error)   return <p className="error">{error}</p>;

  // discount helper
  const getDiscountedPrice = (price, code) => {
    let pct = code.includes('70%') ? 70
            : code.includes('50%') ? 50
            : code.includes('30%') ? 30
            : 20;
    return (price * (1 - pct/100)).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Bag ({cartCount})</h1>

      {cartItems.length === 0
        ? <p className="empty">Your cart is empty.</p>
        : <>
            <ul className="cart-list">
              {cartItems.map((item, i) => (
                <li key={i} className="cart-item">
                  <Link to={`/product/${item.productId._id}`} className="cart-product-link">
                    <img
                      src={item.productId.link}
                      onError={e => e.target.src = '/placeholder.png'}
                      alt={item.productId.productDisplayName}
                      className="cart-image"
                    />
                  </Link>

                  <div className="cart-info">
                    <h3>{item.productId.productDisplayName}</h3>
                    <p>Color: {item.color} | Size: {item.size}</p>
                    <p>Qty: {item.qty}</p>
                    <p>
                      Price:{' '}
                      {item.productId.discountCode
                        ? <>
                            <span className="strike">
                              ${item.productId.price.toFixed(2)}
                            </span>
                            <span className="discounted">
                              ${getDiscountedPrice(
                                item.productId.price,
                                item.productId.discountCode
                              )}
                            </span>
                          </>
                        : <span>${item.productId.price.toFixed(2)}</span>
                      }
                    </p>
                    {item.productId.discountCode &&
                      <p className="code">
                        {item.productId.discountCode.toUpperCase()}
                      </p>
                    }
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleRemove(item.productId._id, item.size, item.color)
                    }
                  >❌ Remove</button>
                </li>
              ))}
            </ul>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </>
      }
    </div>
  );
}
