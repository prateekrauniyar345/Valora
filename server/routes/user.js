// server/routes/user.js
const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
const User     = require('../models/User');
const Cart     = require('../models/Cart');

// ─── POST /api/user/login ────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const guestCartId = req.cookies.cartId;

  try {
    // 1) Authenticate
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success:false, message:'Invalid email or password' });
    }

    // 2) Find or create the user’s cart
    let userCart = await Cart.findOne({ userId: user._id });
    const guestCart = guestCartId
      ? await Cart.findById(guestCartId)
      : null;

    if (!userCart) {
      // No existing user cart → bind the guest cart (or create new)
      if (guestCart) {
        guestCart.userId = user._id;
        await guestCart.save();
        userCart = guestCart;
      } else {
        userCart = await Cart.create({ userId: user._id, items: [] });
      }
    } else if (guestCart && guestCart._id.toString() !== userCart._id.toString()) {
      // Both exist → merge guestCart items into userCart
      guestCart.items.forEach(gItem => {
        const match = userCart.items.find(uItem =>
          uItem.productId.equals(gItem.productId) &&
          uItem.size      === gItem.size &&
          uItem.color     === gItem.color
        );
        if (match) {
          match.qty += gItem.qty;
        } else {
          userCart.items.push(gItem);
        }
      });
      userCart.updatedAt = Date.now();
      await userCart.save();
      // delete the old guest cart
      await Cart.findByIdAndDelete(guestCart._id);
    }

    // 3) Reset the cartId cookie to point at the merged/user cart
    res.cookie('cartId', userCart._id.toString(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30  // 30 days
    });

    // 4) Set the session userId so requireAuth() will pass
    req.session.userId = user._id;

    // 5) Success response
    res.json({
      success: true,
      user: {
        id:        user._id,
        firstName: user.firstName,
        email:     user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success:false, message:'Server error' });
  }
});

// ─── POST /api/user/register ─────────────────────────────
router.post('/register', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    // check if email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success:false, message:'Email already in use' });
    }

    // create the user
    const user = new User({ firstName, lastName, userName, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      user: {
        id:        user._id,
        firstName: user.firstName,
        email:     user.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success:false, message:'Server error' });
  }
});



// POST /api/user/logout
router.post('/logout', (req, res) => {
  // destroy the session on the server
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    // clear the cookie on the client
    res.clearCookie('sid');  // must match the name you used in session config
    res.json({ success: true });
  });
});

module.exports = router;
