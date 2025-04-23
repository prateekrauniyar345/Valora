import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/cart', {
        credentials: 'include'
      });
      const data = await res.json();
      const total = data.items.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(total);
    } catch (err) {
      console.error('Error refreshing cart:', err);
      setCartCount(0);
    }
  };

  // Optionally fetch on mount
  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
