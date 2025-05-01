// server/server.js
require('dotenv').config();
require('./db/main'); // Connect to MongoDB

const express       = require('express');
const cors          = require('cors');
const cookieParser  = require('cookie-parser');
const session       = require('express-session');

const productsRoute = require('./routes/products');
const cartRoutes    = require('./routes/cart');
const userRoutes    = require('./routes/user');      // login/register
const profileRoutes = require('./routes/profile');   // profile GET/PUT
const checkoutRoute = require('./routes/checkout');

const Cart          = require('./models/Cart');

const app = express();

// ─── CORS & PARSING ─────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173', // your React/Vite dev server
  credentials: true                // allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());

// ─── SESSION SETUP ──────────────────────────────────────
// must come after cookieParser, before any auth-protected routes
app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

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

    // Expose cartId to downstream handlers
    req.cartId = cartId;
    next();
  } catch (err) {
    next(err);
  }
});

// ─── ROUTES ───────────────────────────────────────────────
app.use('/api/products',      productsRoute);
app.use('/api/cart',          cartRoutes);
app.use('/api/user',          userRoutes);      // login & register
app.use('/api/user/profile',  profileRoutes);   // get/update profile
app.use('/api/checkout',      checkoutRoute);   // protected checkout

// ─── ERROR HANDLER ───────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ─── START SERVER ────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
