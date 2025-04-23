import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./leaderboard.css";

import img1 from "../assets/leaderboard/img1.jpg";
import img2 from "../assets/leaderboard/img2.jpg";
import img3 from "../assets/leaderboard/img3.jpg";
import img4 from "../assets/leaderboard/img4.png";
import img5 from "../assets/leaderboard/img5.png";
import img6 from "../assets/leaderboard/img6.jpg";

// Sample product images (replace with your actual images)
const slides = [
  {
    id: 1,
    image: img1,
    title: "Image 1",
    description: "Shop now and get the best deals!",
  },
  {
    id: 2,
    image: img2,
    title: "Image 2",
    description: "Check out the latest products!",
  },
  {
    id: 3,
    image: img3,
    title: "Image 3",
    description: "Exclusive discounts available!",
  },
  {
    id: 4,
    image: img4,
    title: "Image 4",
    description: "Limited-time offers, grab yours now!",
  },
  {
    id: 5,
    image: img5,
    title: "Image 5",
    description: "New arrivals, shop now!",
  },
  {
    id: 6,
    image: img6,
    title: "Image 6",
    description: "Best deals available!",
  },
];

const Leaderboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Change slides every 3 seconds
    arrows: false,
  };

  return (
    <div className="leaderboard">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={slide.title} />
            <div className="slide-text">
              {/* <h2>{slide.title}</h2>
              <p>{slide.description}</p> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Leaderboard;
