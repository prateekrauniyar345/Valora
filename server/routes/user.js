// server/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🔐 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// 📝 Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) return res.status(409).json({ success: false, message: 'User already exists' });

    const newUser = new User({ firstName, lastName, userName, email, password });
    await newUser.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// 👤 Get current user
router.get('/me', async (req, res) => {
  const { userId } = req.cookies;
  if (!userId) return res.json(null);

  try {
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ message: 'Server error fetching user' });
  }
});

// 🚪 Logout
router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.json({ success: true });
});

module.exports = router;
