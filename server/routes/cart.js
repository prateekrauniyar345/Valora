// routes/cart.js
// import express from 'express';
// import mongoose from 'mongoose';

// server/routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Discount = require('../models/Discount');

const router = express.Router();

// ✅ GET current cart with fallback to Discount collection
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findById(req.cartId).lean();

    if (!cart) return res.status(404).send({ error: 'Cart not found' });

    // Enrich each item with product details from either collection
    const enrichedItems = await Promise.all(
      cart.items.map(async item => {
        let product = await Product.findById(item.productId).lean();
        if (!product) {
          product = await Discount.findById(item.productId).lean();
        }

        return {
          ...item,
          productId: product || null  // null if not found anywhere
        };
      })
    );

    res.send({
      ...cart,
      items: enrichedItems
    });
  } catch (err) {
    console.error('Error loading cart:', err);
    res.status(500).send({ error: 'Failed to load cart' });
  }
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
