// server/routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

// POST /api/user/register
router.post('/register', async (req, res) => {
    const { firstName,lastName, userName, email, password } = req.body;
  
    try {
      // check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already registered' });
      }
  
      // create new user
      const newUser = new User({ firstName, lastName, userName, email, password }); // 👉 you can add more fields
      await newUser.save();
  
      res.status(201).json({
        success: true,
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          email: newUser.email
        }
      });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  