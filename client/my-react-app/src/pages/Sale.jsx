// src/pages/Sale.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sale = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to sale items — you can pick any default sale tag
    navigate('/search?discount=springsale');
  }, [navigate]);

  return null;
};

export default Sale;
