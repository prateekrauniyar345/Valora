
// Returns.jsx
import React from 'react';
import './infoPages.css';
import { FaUndo } from 'react-icons/fa';

const Returns = () => (
  <div className="info-container">
    <div className="info-content">
      <h1><FaUndo /> Returns & Exchanges</h1>
      <p>We want you to be happy with your purchase. If you're not satisfied, you can return your order:</p>
      <ul>
        <li>Returns accepted within 30 days of delivery.</li>
        <li>Items must be unused, unwashed, and with original tags.</li>
        <li>Refunds processed within 7 business days after approval.</li>
        <li>Return shipping is free for domestic orders.</li>
        <li>To start a return, <a href="/contact">reach out to our team</a>.</li>
      </ul>
    </div>
  </div>
);

export default Returns;