import React, { useState } from "react";
import "./trending.css";
import img1 from '../assets/trending/img1.jpg';
import img2 from '../assets/trending/img2.jpg';
import img3 from '../assets/trending/img3.jpg';
import img4 from '../assets/trending/img4.jpg';
import img5 from '../assets/trending/img5.jpg';
import img6 from '../assets/trending/img6.jpg';
import img7 from '../assets/trending/img7.jpg';
import img8 from '../assets/trending/img8.jpg';
import img9 from '../assets/trending/img9.jpg';
import img10 from '../assets/trending/img10.jpg';
import img11 from '../assets/trending/img11.jpg';
import img12 from '../assets/trending/img12.jpg';
import img13 from '../assets/trending/img13.jpg';
import img14 from '../assets/trending/img14.jpg';
import img15 from '../assets/trending/img15.jpg';
import img16 from '../assets/trending/img16.jpg';
import img17 from '../assets/trending/img17.jpg';
import img18 from '../assets/trending/img18.jpg';
import img19 from '../assets/trending/img19.jpg';
import img20 from '../assets/trending/img20.jpg';


// Sample product images (replace with actual product images)
const products = [
  { id: 1, image: img1, title: "Product 1" },
  { id: 2, image: img2, title: "Product 2" },
  { id: 3, image: img3, title: "Product 3" },
  { id: 4, image: img4, title: "Product 4" },
  { id: 5, image: img5, title: "Product 5" },
  { id: 6, image: img6, title: "Product 6" },
  { id: 7, image: img7, title: "Product 7" },
  { id: 8, image: img8, title: "Product 8" },
  { id: 9, image: img9, title: "Product 9" },
  { id: 10, image: img10, title: "Product 10" },
  { id: 11, image: img11, title: "Product 11" },
  { id: 12, image: img12, title: "Product 12" },
  { id: 13, image: img13, title: "Product 13" },
  { id: 14, image: img14, title: "Product 14" },
  { id: 15, image: img15, title: "Product 15" },
  { id: 16, image: img16, title: "Product 16" },
  { id: 17, image: img17, title: "Product 17" },
  { id: 18, image: img18, title: "Product 18" },
  { id: 19, image: img19, title: "Product 19" },
  { id: 20, image: img20, title: "Product 20" },
];

const TrendingSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleItems = 5; // Number of products visible at a time

  const handleArrowClick = (direction) => {
    if (direction === "left" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
    if (direction === "right" && startIndex + visibleItems < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="trending-section">
      <div className="trending-section__header">
        <h2>Highlights</h2>
      </div>
      <br />
      <div className="trending-section__carousel">
        <button
          className="arrow left-arrow"
          onClick={() => handleArrowClick("left")}
        >
          &lt;
        </button>

        <div className="products-container">
          {products.slice(startIndex, startIndex + visibleItems).map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
            </div>
          ))}
        </div>

        <button
          className="arrow right-arrow"
          onClick={() => handleArrowClick("right")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TrendingSection;
