// import React from "react";
// import "./shopByCategory.css";

// import dressImg from "../assets/shopbycategory/dress.jpg";
// import shoesImg from "../assets/shopbycategory/shoes.jpg";
// import perfumeImg from "../assets/shopbycategory/perfume.jpg";
// import bagsImg from "../assets/shopbycategory/bags.jpg";

// const ShopByCategory = () => {
//   const categories = [
//     { id: 1, name: "Shop Dress", image: dressImg },
//     { id: 2, name: "Shop Shoes", image: shoesImg },
//     { id: 3, name: "Shop Perfumes", image: perfumeImg },
//     { id: 4, name: "Shop Bags", image: bagsImg },
//   ];

//   return (
//     <div className="shop-by-category">
//     <div className="line">
//       <hr />
//     </div>
//       <h1>Shop by Category</h1>
//       <br/>
//       <div className="category_collection">
//         {categories.map((category) => (
//           <div key={category.id} className="category-card">
//             <img src={category.image} alt={category.name} />
//             <button className="category-button">{category.name}</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ShopByCategory;

import React from "react";
import "./shopByCategory.css";
import { useNavigate } from "react-router-dom";

import dressImg from "../assets/shopbycategory/dress.jpg";
import shoesImg from "../assets/shopbycategory/shoes.jpg";
import perfumeImg from "../assets/shopbycategory/perfume.jpg";
import bagsImg from "../assets/shopbycategory/bags.jpg";

import slugify from "slugify";

const ShopByCategory = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Dress", image: dressImg },
    { id: 2, name: "Shoes", image: shoesImg },
    { id: 3, name: "Perfumes", image: perfumeImg },
    { id: 4, name: "Bags", image: bagsImg },
  ];

  const handleCategoryClick = (name) => {
    const slug = slugify(name, { lower: true });
    navigate(`/products/women/${slug}`);
  };

  return (
    <div className="shop-by-category">
      <div className="line">
        <hr />
      </div>
      <h1>Shop by Category</h1>
      <br />
      <div className="category_collection">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img src={category.image} alt={category.name} />
            <button
              className="category-button"
              onClick={(e) => {
                e.stopPropagation(); // prevent bubbling to parent
                handleCategoryClick(category.name);
              }}
            >
              Shop {category.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
