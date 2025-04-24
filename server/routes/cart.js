const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// GET current cart
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findById(req.cartId).populate('items.productId');
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    console.error('❌ Failed to fetch cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
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

// Stripe checkout
router.post('/checkout', async (req, res) => {
  const { items } = req.body;
  console.log("🛒 Checkout Items:", items);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty items array' });
  }

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.productId?.productDisplayName || item.productId?.name || item.name || 'Unnamed Product',

      },
      unit_amount: Math.round((item.productId?.price || item.price) * 100),
    },
    quantity: item.qty || item.quantity || 1,
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
