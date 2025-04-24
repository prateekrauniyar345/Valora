// import React from 'react';
// import './ProductCard.css';
// import { Link } from 'react-router-dom';

// const SIZES = ['XS','S','M','L','XL','XXL'];

// const ProductCard = ({ product }) => {
//   const {
//     productDisplayName,
//     price,
//     baseColour,
//     rating = 0,
//   } = product;

//   // figure out which sizes are in stock
//   const sizes = SIZES.filter(sz => product[`size_${sz}`] > 0);

//   return (
//     <Link to={`/product/${product._id}`} className="product-card">
//     <article className="">
//       <div className="card-image">
//         <img src={product.link} alt={productDisplayName} />
//       </div>
//       <div className="card-body">
//         <h5 className="card-title">{productDisplayName}</h5>
//         <p className="card-detail"><strong>Color:</strong> {baseColour}</p>
//         <p className="card-detail">
//           <strong>Sizes:</strong> {sizes.length ? sizes.join(', ') : '—'}
//         </p>
//         <p className="card-price">${price.toFixed(2)}</p>
//         <p className="card-rating">⭐ {rating.toFixed(1)} / 5</p>
//       </div>
//     </article>
//     </Link>
//   );
// };

// export default ProductCard;



import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const getDiscountPercent = (code) => {
  const match = /^(\d+)%\-off$/.exec(code);
  return match ? parseInt(match[1]) : 20; // default to 20% for non-numeric codes
};

const ProductCard = ({ product }) => {
  const {
    productDisplayName,
    price,
    baseColour,
    rating = 0,
    discountCode
  } = product;

  const isDiscounted = !!discountCode;
  const discountPercent = isDiscounted ? getDiscountPercent(discountCode) : 0;
  const discountedPrice = isDiscounted ? (price * (1 - discountPercent / 100)).toFixed(2) : price.toFixed(2);

  const sizes = SIZES.filter(sz => product[`size_${sz}`] > 0);

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <article className="">
        <div className="card-image">
          <img src={product.link} alt={productDisplayName} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{productDisplayName}</h5>
          <p className="card-detail"><strong>Color:</strong> {baseColour}</p>
          <p className="card-detail">
            <strong>Sizes:</strong> {sizes.length ? sizes.join(', ') : '—'}
          </p>

          {/* Price */}
          <p className="card-price">
            {isDiscounted ? (
              <>
                <span className="old-price">${price.toFixed(2)}</span>{' '}
                <span className="new-price">${discountedPrice}</span>
              </>
            ) : (
              <span className="new-price">${discountedPrice}</span>
            )}
          </p>

          <p className="card-rating">⭐ {rating.toFixed(1)} / 5</p>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
