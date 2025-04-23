import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our store! We are a passionate team dedicated to bringing you the best online shopping experience. Our mission is to make fashion, lifestyle, and accessories more accessible and enjoyable for everyone.
        </p>
        <p>
          Whether you're looking for the latest trends in clothing, timeless accessories, or quality essentials for men, women, and kids — we’ve got you covered. Our platform is designed with simplicity and user-friendliness in mind so you can shop with ease.
        </p>
        <p>
          Thank you for being a part of our journey. We’re excited to serve you and grow together as a community.
        </p>
        <a className="back-home" href="/">← Back to Home</a>
      </div>
    </div>
  );
};

export default About;