import React from "react";
import "./shopbygender.css";

import herImage from "../assets/bygender/byher.jpg";
import himImage from "../assets/bygender/byhim.jpg";

const ByGender = () => {
  return (
    <div className="by-gender-container">
    <div className="line">
    <br />
      <br />
      <hr />
    </div>
    <h2>New Arrival</h2>
    
      <div className="gender-section">
        <div className="image-container">
          <img src={herImage} alt="For Her" className="gender-image" />
          <button className="gender-button">For Her</button>
        </div>
        <div className="image-container">
          <img src={himImage} alt="For Him" className="gender-image" />
          <button className="gender-button">For Him</button>
        </div>
      </div>
    </div>
  );
};

export default ByGender;