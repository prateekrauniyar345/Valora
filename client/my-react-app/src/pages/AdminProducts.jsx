import React, { useState, useEffect } from 'react';
import './AdminProducts.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm]         = useState({});
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // fetch existing products
  useEffect(() => {
    fetch('http://localhost:5001/api/admin/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Unable to load products');
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // submit new product
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/admin/products', {
        method:  'POST',
        headers: {'Content-Type':'application/json'},
        body:    JSON.stringify({
          ...form,
          id:           parseInt(form.id, 10),
          year:         parseInt(form.year, 10),
          rating:       parseFloat(form.rating),
          filename:     parseInt(form.filename, 10),
          price:        parseFloat(form.price),
          in_stock:     parseInt(form.in_stock, 10),
          size_XS:      parseInt(form.size_XS, 10),
          size_S:       parseInt(form.size_S, 10),
          size_M:       parseInt(form.size_M, 10),
          size_L:       parseInt(form.size_L, 10),
          size_XL:      parseInt(form.size_XL, 10),
          size_XXL:     parseInt(form.size_XXL, 10),
        })
      });
      if (!res.ok) throw new Error('Create failed');
      const created = await res.json();
      setProducts(p => [created, ...p]);
      setForm({});
      alert('Product created!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error creating product');
    }
  };

  if (loading) return <p className="loading">Loading…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>Admin → Products</h1>

        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>Add New Product</h2>

          <input
            className="wide-input"
            name="id"
            type="number"
            placeholder="Numeric ID"
            value={form.id || ''}
            onChange={handleChange}
            required
          />

          <input
            className="wide-input"
            name="gender"
            placeholder="Gender"
            value={form.gender || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="masterCategory"
            placeholder="Master Category"
            value={form.masterCategory || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="subCategory"
            placeholder="Sub Category"
            value={form.subCategory || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="articleType"
            placeholder="Article Type"
            value={form.articleType || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="baseColour"
            placeholder="Base Colour"
            value={form.baseColour || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="season"
            placeholder="Season"
            value={form.season || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="year"
            type="number"
            placeholder="Year"
            value={form.year || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="usage"
            placeholder="Usage"
            value={form.usage || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="productDisplayName"
            placeholder="Display Name"
            value={form.productDisplayName || ''}
            onChange={handleChange}
            required
          />

          <input
            className="wide-input"
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={form.rating || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="filename"
            type="number"
            placeholder="Filename (numeric)"
            value={form.filename || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="link"
            placeholder="Image URL"
            value={form.link || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="price"
            type="number"
            step="0.01"
            placeholder="Price"
            value={form.price || ''}
            onChange={handleChange}
          />

          <input
            className="wide-input"
            name="in_stock"
            type="number"
            placeholder="In Stock"
            value={form.in_stock || ''}
            onChange={handleChange}
          />

          <div className="size-grid">
            <input
              className="wide-input"
              name="size_XS"
              type="number"
              placeholder="Size XS"
              value={form.size_XS || ''}
              onChange={handleChange}
            />
            <input
              className="wide-input"
              name="size_S"
              type="number"
              placeholder="Size S"
              value={form.size_S || ''}
              onChange={handleChange}
            />
            <input
              className="wide-input"
              name="size_M"
              type="number"
              placeholder="Size M"
              value={form.size_M || ''}
              onChange={handleChange}
            />
            <input
              className="wide-input"
              name="size_L"
              type="number"
              placeholder="Size L"
              value={form.size_L || ''}
              onChange={handleChange}
            />
            <input
              className="wide-input"
              name="size_XL"
              type="number"
              placeholder="Size XL"
              value={form.size_XL || ''}
              onChange={handleChange}
            />
            <input
              className="wide-input"
              name="size_XXL"
              type="number"
              placeholder="Size XXL"
              value={form.size_XXL || ''}
              onChange={handleChange}
            />
          </div>

          <input
            className="wide-input"
            name="material"
            placeholder="Material"
            value={form.material || ''}
            onChange={handleChange}
          />

          <button type="submit" className="save-btn">
            Create Product
          </button>
        </form>

        <hr />

        <h2>Existing Products</h2>
        <ul className="admin-list">
          {products.map(p => (
            <li key={p._id}>
              <img src={p.link} alt={p.productDisplayName} />
              <span>
                {p.productDisplayName} — ${p.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
