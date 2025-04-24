const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');

router.get('/', async (req, res) => {
  try {
    const { code } = req.query;
    const filter = code ? { discountCode: new RegExp(`^${code}$`, 'i') } : {};
    const items = await Discount.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch discount products' });
  }
});

module.exports = router;
