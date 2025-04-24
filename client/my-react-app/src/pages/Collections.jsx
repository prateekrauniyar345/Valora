// src/pages/Collections.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to search results for men's collection
    navigate('/search?query=mens');
  }, [navigate]);

  return null; // optional fallback text can go here
};

export default Collections;
