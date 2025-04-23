import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
    <div style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></div>
    <br />
    <br />
      <div className="footer__content">
        {/* About Us Section */}
        <div className="footer__section about-us">
          <h3>About Us</h3>
          <p>We are a luxury fashion brand offering timeless styles and impeccable craftsmanship.</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer__section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="footer__section customer-service">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/size-guide">Size Guide</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="footer__section follow-us">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://twitter.com">Twitter</a></li>
            <li><a href="https://instagram.com">Instagram</a></li>
            <li><a href="https://youtube.com">YouTube</a></li>
            <li><a href="https://pinterest.com">Pinterest</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer__section newsletter">
          <h3>Stay in Touch</h3>
          <p>Sign up for exclusive offers, the latest collections, and more.</p>
          <br/>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer__bottom">
        <p>&copy; 2024 Valora. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
