import React from 'react';
import './contacts.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out to us anytime through the following ways:</p>

        <div className="contact-info">
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Email:</strong> support@shopmate.com</p>
          <p><strong>Instagram:</strong> @shopmate</p>
          <p><strong>Facebook:</strong> ShopMate Official</p>
          <p><strong>Twitter:</strong> @ShopMateHQ</p>
        </div>

        <p className="thank-you">Thank you for shopping with us!</p>
        <a className="back-home" href="/">← Back to Home</a>
      </div>
    </div>
  );
};

export default Contact;