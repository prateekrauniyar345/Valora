// Shipping.jsx
import React from 'react';
import './infoPages.css';
import { FaTruck } from 'react-icons/fa';

const Shipping = () => (
  <div className="info-container">
    <div className="info-content">
      <h1><FaTruck /> Shipping Information</h1>
      <p>We aim to deliver your order as quickly and efficiently as possible. Here’s what you need to know:</p>
      <ul>
        <li><strong>Standard Shipping:</strong> Delivered in 5–7 business days.</li>
        <li><strong>Express Shipping:</strong> Delivered in 2–3 business days.</li>
        <li><strong>International Shipping:</strong> Estimated delivery within 10–15 business days.</li>
        <li><strong>Tracking:</strong> You will receive an email with tracking info.</li>
        <li><strong>Shipping Fee:</strong> Free over $50. Flat $4.99 for others.</li>
      </ul>
      <p>If you have any questions about shipping, feel free to <a href="/contact">contact us</a>.</p>
    </div>
  </div>
);

export default Shipping;
