// server/routes/cart.js//this change
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// ─────────────────────────────────────────────────────────────
// GET /api/cart → Return the user's current cart
router.get('/', async (req, res) => {
  const cart = await Cart.findById(req.cartId).populate('items.productId');
  if (!cart) return res.status(404).json({ error: 'Cart not found' });
  res.json(cart);
});

// POST /api/cart/items → Add item to cart
router.post('/items', async (req, res) => {
  const { productId, qty = 1, size, color } = req.body;
  const cart = await Cart.findById(req.cartId);
  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  const index = cart.items.findIndex(i =>
    i.productId.equals(productId) && i.size === size && i.color === color
  );

  if (index >= 0) {
    cart.items[index].qty += qty;
  } else {
    cart.items.push({ productId, qty, size, color });
  }

  cart.updatedAt = Date.now();
  await cart.save();
  res.json(cart);
});

// PUT /api/cart/items → Update quantity of item in cart
router.put('/items', async (req, res) => {
  const { productId, size, color, qty } = req.body;
  const cart = await Cart.findById(req.cartId);
  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  const item = cart.items.find(i =>
    i.productId.equals(productId) && i.size === size && i.color === color
  );

  if (item) item.qty = qty;

  cart.updatedAt = Date.now();
  await cart.save();
  res.json(cart);
});

// DELETE /api/cart/items → Remove item from cart
router.delete('/items', async (req, res) => {
  const { productId, size, color } = req.body;
  const cart = await Cart.findById(req.cartId);
  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  cart.items = cart.items.filter(i =>
    !(i.productId.equals(productId) && i.size === size && i.color === color)
  );

  cart.updatedAt = Date.now();
  await cart.save();
  res.json(cart);
});

// ─────────────────────────────────────────────────────────────
// POST /api/cart/checkout → Create Stripe checkout session from cart
router.post('/checkout', async (req, res) => {
  const cart = await Cart.findById(req.cartId).populate('items.productId');
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty or not found' });
  }

  const lineItems = cart.items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.productId.name || 'Unnamed Product',
      },
      unit_amount: Math.round(item.productId.price * 100),
    },
    quantity: item.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe session creation error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
