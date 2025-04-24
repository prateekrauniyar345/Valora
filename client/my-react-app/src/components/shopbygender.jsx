import React from "react";
import { useNavigate } from "react-router-dom";
import "./shopbygender.css";

import herImage from "../assets/bygender/byher.jpg";
import himImage from "../assets/bygender/byhim.jpg";

const ByGender = () => {
  const navigate = useNavigate();

  const handleClick = (gender) => {
    const searchQuery = gender === "men" ? "mens" : "womens";
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="by-gender-container">
      <div className="line">
        <br />
        <br />
        <hr />
      </div>
      <h2>New Arrival</h2>

      <div className="gender-section">
        <div className="image-container" onClick={() => handleClick("women")}>
          <img src={herImage} alt="For Her" className="gender-image" />
          <button
            className="gender-button"
            onClick={(e) => {
              e.stopPropagation(); // prevent double firing
              handleClick("women");
            }}
          >
            For Her
          </button>
        </div>

        <div className="image-container" onClick={() => handleClick("men")}>
          <img src={himImage} alt="For Him" className="gender-image" />
          <button
            className="gender-button"
            onClick={(e) => {
              e.stopPropagation();
              handleClick("men");
            }}
          >
            For Him
          </button>
        </div>
      </div>
    </div>
  );
};

export default ByGender;
