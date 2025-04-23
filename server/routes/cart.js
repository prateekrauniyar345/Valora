// routes/cart.js
// import express from 'express';
// import mongoose from 'mongoose';

// server/routes/cart.js
const express = require('express');
const Cart    = require('../models/Cart');
const router  = express.Router();


// GET current cart
router.get('/', async (req, res) => {
  const cart = await Cart.findById(req.cartId).populate('items.productId');
  if (!cart) return res.status(404).send({ error: 'Cart not found' });
  res.send(cart);
});

// POST add/update an item
router.post('/items', async (req, res) => {
  const { productId, qty = 1, size, color } = req.body;
  const cart = await Cart.findById(req.cartId);
  if (!cart) return res.status(404).send({ error: 'Cart not found' });

  // see if that variant already exists
  const idx = cart.items.findIndex(i =>
    i.productId.equals(productId) &&
    i.size === size &&
    i.color === color
  );

  if (idx >= 0) {
    cart.items[idx].qty += qty;
  } else {
    cart.items.push({ productId, qty, size, color });
  }

  cart.updatedAt = Date.now();
  await cart.save();
  res.send(cart);
});

// DELETE remove an item
router.delete('/items', async (req, res) => {
  const { productId, size, color } = req.body;
  const cart = await Cart.findById(req.cartId);
  if (!cart) return res.status(404).send({ error: 'Cart not found' });

  cart.items = cart.items.filter(i =>
    !(
      i.productId.equals(productId) &&
      i.size === size &&
      i.color === color
    )
  );
  cart.updatedAt = Date.now();
  await cart.save();
  res.send(cart);
});

// PUT replace qty of an item
router.put('/items', async (req, res) => {
  const { productId, size, color, qty } = req.body;
  const cart = await Cart.findById(req.cartId);
  if (!cart) return res.status(404).send({ error: 'Cart not found' });

  const item = cart.items.find(i =>
    i.productId.equals(productId) &&
    i.size === size &&
    i.color === color
  );
  if (item) item.qty = qty;
  cart.updatedAt = Date.now();
  await cart.save();
  res.send(cart);
});

module.exports = router;
