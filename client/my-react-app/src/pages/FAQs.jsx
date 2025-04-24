
// FAQs.jsx
import React from 'react';
import './infoPages.css';
import { FaQuestionCircle } from 'react-icons/fa';

const FAQs = () => (
  <div className="info-container">
    <div className="info-content">
      <h1><FaQuestionCircle /> Frequently Asked Questions</h1>
      <ul>
        <li><strong>How do I track my order?</strong> You’ll receive a tracking email once shipped.</li>
        <li><strong>Can I change my order after placing it?</strong> Contact support within 12 hours.</li>
        <li><strong>Do you ship internationally?</strong> Yes, to over 50 countries.</li>
        <li><strong>What if I receive a damaged item?</strong> Contact us with a photo and order number.</li>
      </ul>
    </div>
  </div>
);

export default FAQs;