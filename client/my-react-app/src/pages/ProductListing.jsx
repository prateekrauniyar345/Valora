import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams  } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './ProductListing.css'; // updated filename
import pluralize from 'pluralize';

const ALL = 'all';

const ProductListing = () => {
  const { gender: routeGender, category } = useParams();
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // ─── FILTER STATE ───────────────────────────────────────
  const [priceRange, setPriceRange]       = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // these will be derived from the data once loaded
  const [availableSizes, setAvailableSizes]   = useState(['XS','S','M','L','XL','XXL']);
  const [availableColors, setAvailableColors] = useState([]);


  // ─── SEARCH QUERY ──────────────────────────────
  const [searchParams]           = useSearchParams();   
  const query                    = searchParams.get('query') || '';
  // const genderParam    = searchParams.get('gender') || routeGender || 'all'; // override or fallback

  const raw = searchParams.get('query') || '';
  console.log('raw', raw);
  // 2) parse out “for <gender>”
  const m = raw.match(/(.+)\s+for\s+(man|men|woman|women|boy|boys|girl|girls)$/i);
  console.log('m', m);
  const term = pluralize.singular(m ? m[1].trim() : raw);
  console.log('term', term);
  const genderParam = m
    ? pluralize.plural(m[2].toLowerCase())
    : routeGender || ALL;
  console.log('genderParam', genderParam);
  // const term = pluralize.singular(searchParams.get('query') || '');
  // const genderParam = searchParams.get('gender') || routeGender || ALL;


  
    useEffect(() => {
      setLoading(true);
    
      // build params once
      const params = new URLSearchParams();
      if (term) {
        params.set('search', term);
      } else {
        params.set('category', category || 'all');
      }
      // always include the genderParam
      params.set('gender', genderParam);
    
      fetch(`http://localhost:5001/api/products?${params.toString()}`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(data => {
          setItems(data);
          // derive your colors, priceRange, etc…
          // derive available colors from what the API returned
          const colors = Array.from(
            new Set(data.map(product => product.baseColour))
          );
          setAvailableColors(colors);

          // …and you could also derive your min/max price here if you want:
          // const prices = data.map(p => p.price);
          // setPriceRange([Math.min(...prices), Math.max(...prices)]);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }, [category, term, genderParam]);
  
  // ─── APPLY CLIENT‑SIDE FILTERS ─────────────────────────
  const filtered = useMemo(() => {
    return items.filter(p => {
      // price
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      // size
      if (selectedSizes.length) {
        const hasSize = selectedSizes.some(sz => p[`size_${sz}`] > 0);
        if (!hasSize) return false;
      }
      // color
      if (selectedColors.length && !selectedColors.includes(p.baseColour)) {
        return false;
      }
      return true;
    });
  }, [items, priceRange, selectedSizes, selectedColors]);

  // ─── HELPERS ───────────────────────────────────────────
  const toggle = setter => value =>
    setter(prev => prev.includes(value)
      ? prev.filter(v => v !== value)
      : [...prev, value]
    );

  if (loading) return <p>Loading…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <div className="product-listing-container">
      {/* ─── SIDEBAR ─────────────────────────────── */}
      <aside className="sidebar">
        <h3>Filters</h3>

        {/* Price */}
        <div className="filter-group price-filter">
          <h4>Price</h4>

          <div className="price-inputs">
            <div className="price-field">
              <label htmlFor="min-price">Min</label>
              <input
                id="min-price"
                type="number"
                min="0"
                step="1"
                value={priceRange[0]}
                onChange={e => {
                  const min = Number(e.target.value);
                  // ensure min never > max
                  setPriceRange([Math.min(min, priceRange[1]), priceRange[1]]);
                }}
              />
            </div>

            <span className="price-sep">–</span>

            <div className="price-field">
              <label htmlFor="max-price">Max</label>
              <input
                id="max-price"
                type="number"
                min="0"
                step="1"
                value={priceRange[1]}
                onChange={e => {
                  const max = Number(e.target.value);
                  // ensure max never < min
                  setPriceRange([priceRange[0], Math.max(max, priceRange[0])]);
                }}
              />
            </div>
          </div>
        </div>


        {/* Sizes */}
        <div className="filter-group">
          <h4>Sizes</h4>
          {availableSizes.map(sz => (
            <label key={sz} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedSizes.includes(sz)}
                onChange={() => toggle(setSelectedSizes)(sz)}
              />
              {sz}
            </label>
          ))}
        </div>

        {/* Colors */}
        <div className="filter-group">
          <h4>Colors</h4>
          {availableColors.map(col => (
            <label key={col} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedColors.includes(col)}
                onChange={() => toggle(setSelectedColors)(col)}
              />
              {col}
            </label>
          ))}
        </div>
      </aside>

      {/* ─── PRODUCT GRID ─────────────────────────── */}
      <main className="listing-main">
        {/* <h2>
          {gender.toUpperCase()} / {category === ALL ? 'All' : category.replace(/-/g,' ')} —
          {filtered.length} items
        </h2> */}
        <div className="product-grid">
          {filtered.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
