// // server/server.js
// require('dotenv').config();
// require('./db/main');                   // initialize mongoose connection

// const express        = require('express');
// const cors           = require('cors');
// const productsRoute  = require('./routes/products');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/products', productsRoute);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );

// above code was working old code




// server/server.js
require('dotenv').config();
require('./db/main');                   // initialize mongoose connection

const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');

const productsRoute = require('./routes/products');
const cartRoutes    = require('./routes/cart');
const Cart          = require('./models/Cart');   // ensure Cart model is registered

const app = express();

// ─── CORS & Parsing ────────────────────────────────────
// allow your frontend origin to send credentials (cookies)
// app.use(cors());
// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// ─── Guest-Cart Middleware ─────────────────────────────
// Ensures every client has a Cart in Mongo, even before login
app.use(async (req, res, next) => {
  try {
    let cartId = req.cookies.cartId;

    if (!cartId) {
      // create a new empty Cart document
      const cart = await Cart.create({});
      cartId = cart._id.toString();

      // set HTTP-only cookie so browser sends it on every request
      res.cookie('cartId', cartId, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
      });
    }

    // expose cartId on req for your routes
    req.cartId = cartId;
    next();

  } catch (err) {
    next(err);
  }
});

// ─── Routes ─────────────────────────────────────────────
app.use('/api/products', productsRoute);
app.use('/api/cart',     cartRoutes);

// ─── Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// ─── Start Server ───────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
