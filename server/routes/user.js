const express = require('express');
const router = express.Router();
const User = require('../models/User');

<<<<<<< Updated upstream
// 🔐 Login
=======
// 🔐 POST /api/user/login
>>>>>>> Stashed changes
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
<<<<<<< Updated upstream
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });
=======

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
>>>>>>> Stashed changes

    res.cookie('userId', user._id.toString(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
<<<<<<< Updated upstream
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
=======
      maxAge: 1000 * 60 * 60 * 24 * 7
>>>>>>> Stashed changes
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
<<<<<<< Updated upstream
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

=======
  }
});

// 📎 GET /api/user/me (get current logged-in user)
router.get('/me', async (req, res) => {
  const { userId } = req.cookies;
  if (!userId) return res.json(null);

  try {
    const user = await User.findById(userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
});

// 📝 PUT /api/user/profile — update profile info
router.put('/profile', async (req, res) => {
  const { userId } = req.cookies;
  if (!userId) return res.status(401).json({ success: false, message: 'Not authenticated' });

  try {
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      billingName: req.body.billingName,
      billingAddress: req.body.billingAddress,
      cardNumber: req.body.cardNumber,
      expiryDate: req.body.expiryDate,
      cvv: req.body.cvv
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true
    }).select('-password');

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ success: false, message: 'Server error during profile update' });
  }
});

// 🚪 POST /api/user/logout
router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.json({ success: true });
});

// 🎕 POST /api/user/register
router.post('/register', async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({ firstName, lastName, userName, email, password });
    await newUser.save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

>>>>>>> Stashed changes
module.exports = router;
