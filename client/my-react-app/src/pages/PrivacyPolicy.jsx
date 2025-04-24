// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './contacts.css'; // ✅ reuse the same CSS

const PrivacyPolicy = () => (
  <div className="contact-container">
    <div className="contact-box">
      <h2>Privacy Policy</h2>
      <p>
        We value your privacy. Our policy outlines how we collect, use, and protect your data when you use our services.
      </p>
      <p>
        Information collected is used only for order processing, service improvement, and communication. We never sell your personal data to third parties.
      </p>
      <p>
        By using our website, you consent to our policy. Changes will be reflected on this page.
      </p>
      <p>Thank you for trusting us!</p>

      <p style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: 'orange' }}>← Back to Home</Link>
      </p>
    </div>
  </div>
);

export default PrivacyPolicy;
