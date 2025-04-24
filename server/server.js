require('dotenv').config();
require('./db/main'); // Connect to MongoDB

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const productsRoute = require('./routes/products');
const cartRoutes    = require('./routes/cart');
const userRoutes    = require('./routes/user');   // ✅ New user route
const Cart          = require('./models/Cart');

const app = express();

// ─── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173', // your frontend port
  credentials: true               // allow cookies from frontend
}));
app.use(cookieParser());
app.use(express.json());

// ─── Guest Cart Middleware ───────────────────────────────
app.use(async (req, res, next) => {
  try {
    let cartId = req.cookies.cartId;

    if (!cartId) {
      const cart = await Cart.create({});
      cartId = cart._id.toString();

      res.cookie('cartId', cartId, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
      });
    }

    req.cartId = cartId;
    next();
  } catch (err) {
    next(err);
  }
});

// ─── Routes ───────────────────────────────────────────────
app.use('/api/products', productsRoute);
app.use('/api/cart',     cartRoutes);
app.use('/api/user',     userRoutes); // ✅ User login/register routes

// ─── Error Handler ────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
