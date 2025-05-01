// src/components/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // fetch full cart and update count
  const refreshCart = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/cart', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Cart fetch failed');
      const data = await res.json();
      const total = (data.items || []).reduce((sum, item) => sum + item.qty, 0);
      setCartCount(total);
    } catch (err) {
      console.error('Error refreshing cart:', err);
      setCartCount(0);
    }
  };

  // add or update one item then refresh
  const addToCart = async ({ productId, qty = 1, size, color }) => {
    try {
      const res = await fetch('http://localhost:5001/api/cart/items', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, qty, size, color })
      });
      if (!res.ok) throw new Error('Add to cart failed');

      // we ignore the payload here and just refresh
      await refreshCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    }
  };

  // on mount, prime the count
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
