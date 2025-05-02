// server/routes/adminProducts.js
const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const items = await Product.find().limit(1000); // adjust limit as you please
    res.json(items);
  } catch (err) {
    console.error('Admin GET products error:', err);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  try {
    // we expect the full product schema in the body
    const payload = req.body;
    const created = await Product.create(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error('Admin create product error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
