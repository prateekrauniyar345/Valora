import React, { useEffect, useState } from 'react';
import { useParams, Link }              from 'react-router-dom';
import './ProductDetails.css';
import { useCart } from '../components/CartContext';




const SIZES = ['XS','S','M','L','XL','XXL'];

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [selSize, setSelSize]   = useState('');
  const [selColor, setSelColor] = useState('');

  const { refreshCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then(r => r.json())
      .then(data => {
        setProduct(data);
        setSelColor(data.baseColour);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load product');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p className="error">{error}</p>;




  // add to cart logic
  const handleAddToCart = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/cart/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // ⬅️ so cartId cookie is sent
        body: JSON.stringify({
          productId: product._id,
          size: selSize,
          color: selColor,
          qty: 1
        })
      });
  
      if (!res.ok) throw new Error('Failed to add to cart');
      const updatedCart = await res.json();
      await refreshCart(); // 🔥 this updates global cartCount
      console.log('✅ Added to cart:', updatedCart);
      // alert('Added to cart!');
    } catch (err) {
      console.error(err);
      alert('Error adding to cart');
    }
  };
  

  // size availability: p[`size_S`]… etc
  return (
    <div className="product-detail-container">
      <nav className="pd-breadcrumbs">
        <Link to="/">Home</Link> 〉{' '}
        <Link to={`/products/${product.gender.toLowerCase()}/all`}>
          {product.gender}
        </Link> 〉{' '}
        <span>{product.masterCategory}</span>
      </nav>

      <div className="pd-main">
        {/* gallery */}
        <div className="pd-gallery">
          <img
            className="pd-main-img"
            src={product.link}
            alt={product.productDisplayName}
          />
        </div>

        {/* info */}
        <div className="pd-info">
          <h1 className="pd-title">{product.productDisplayName}</h1>
          <p className="pd-price">${product.price.toFixed(2)}</p>

          {/* Colour */}
          <div className="pd-section">
            <h4>Color:</h4>
            <div className="pd-colors">
              {[product.baseColour].map(col => (
                <button
                  key={col}
                  className={`pd-swatch ${
                    selColor === col ? 'selected' : ''
                  }`}
                  style={{ backgroundColor: col.toLowerCase() }}
                  onClick={() => setSelColor(col)}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="pd-section">
            <h4>Size:</h4>
            <div className="pd-sizes">
              {SIZES.map(sz => {
                const avail = product[`size_${sz}`] > 0;
                return (
                  <button
                    key={sz}
                    disabled={!avail}
                    className={`pd-size-btn ${selSize===sz?'selected':''}`}
                    onClick={() => avail && setSelSize(sz)}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── Rating ───────────────────────────── */}
          <div className="pd-rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`star ${i < Math.round(product.rating) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
            <span className="pd-rating-value">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          {/* ─── Material ─────────────────────────── */}
          <div className="pd-material">
            <strong>Material:</strong> {product.material}
          </div>

          
          {/* ─── Add to Cart ──────────────────────── */}
          <button
            className="pd-add-btn"
            disabled={!selSize}
            onClick={handleAddToCart}
          >
            Add to Bag
          </button>

        </div>
      </div>
    </div>
  );
}
