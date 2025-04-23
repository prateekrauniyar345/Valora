import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const SIZES = ['XS','S','M','L','XL','XXL'];

const ProductCard = ({ product }) => {
  const {
    productDisplayName,
    price,
    baseColour,
    rating = 0,
  } = product;

  // figure out which sizes are in stock
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
        <p className="card-price">${price.toFixed(2)}</p>
        <p className="card-rating">⭐ {rating.toFixed(1)} / 5</p>
      </div>
    </article>
    </Link>
  );
};

export default ProductCard;
