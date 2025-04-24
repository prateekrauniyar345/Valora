// src/pages/TermsAndConditions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './contacts.css'; // ✅ reuse the same CSS

const TermsAndConditions = () => (
  <div className="contact-container">
    <div className="contact-box">
      <h2>Terms & Conditions</h2>
      <p>
        By accessing or using our website, you agree to be bound by these terms. Please read them carefully.
      </p>
      <p>
        We reserve the right to update these terms at any time. Continued use of the service indicates your acceptance of the revised terms.
      </p>
      <p>
        Our services are provided "as is" without warranties. We are not liable for any damages arising from use of our website.
      </p>
      <p>Thanks for shopping with us!</p>

      <p style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: 'orange' }}>← Back to Home</Link>
      </p>
    </div>
  </div>
);

export default TermsAndConditions;
