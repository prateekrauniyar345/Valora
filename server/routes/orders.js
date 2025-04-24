// server/routes/orders.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.post('/', async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items to order' });
    }

    // In production, you'd save this to an "Order" model
    console.log('🧾 New guest order:', items);
    res.status(200).json({ message: 'Order received!' });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: 'Order failed' });
  }
});

module.exports = router;

