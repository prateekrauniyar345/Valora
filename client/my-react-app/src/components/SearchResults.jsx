import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchResults.css';
import API_BASE from './api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products?search=${query}`);
        // const res = await fetch(`http://localhost:5001/api/products?search=${query}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="product-display">
      <h2>Search Results for: <em>{query}</em></h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <div className="product-card" key={product._id}>
              <img src={product.link} alt={product.productDisplayName} />
              <h4>{product.productDisplayName}</h4>
              <p>Material: {product.material}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
