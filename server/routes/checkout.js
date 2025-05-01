// server/routes/checkout.js
require('dotenv').config();

const express     = require("express");
const Stripe      = require("stripe");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/checkout/create-checkout-session
 * Protected: user must be logged in
 */
router.post(
  "/create-checkout-session",
  requireAuth,
  async (req, res) => {
    try {
      const { items } = req.body;

      // Filter out invalid items
      const validItems = Array.isArray(items)
        ? items.filter(item =>
            item.name &&
            typeof item.price === "number" &&
            !isNaN(item.price) &&
            item.price > 0 &&
            item.quantity > 0
          )
        : [];

      if (validItems.length === 0) {
        return res.status(400).json({ error: "No valid items in cart" });
      }

      // Build Stripe line_items
      const lineItems = validItems.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      // Create the Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url:  `${process.env.CLIENT_URL}/cart`
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe Checkout Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
