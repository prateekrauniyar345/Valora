// server/routes/profile.js
const express     = require('express');
const requireAuth = require('../middleware/requireAuth');
const User        = require('../models/User');
const UserProfile = require('../models/UserProfile');

const router = express.Router();

// GET /api/user/profile
router.get('/', requireAuth, async (req, res) => {
  try {
    // load basic user info + profile
    const user = await User.findById(req.session.userId, 'username email createdAt');
    const profile = await UserProfile.findOne({ userId: req.session.userId }).lean();

    if (!profile) {
      // if no profile yet, return empty defaults
      return res.json({
        user,
        fullName:          '',
        phone:             '',
        dob:               null,
        shippingAddresses: [],
        billingAddress:    {},
        paymentMethods:    []
      });
    }

    res.json({ user, ...profile });
  } catch (err) {
    console.error('Profile GET error:', err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

// PUT /api/user/profile
router.put('/', requireAuth, async (req, res) => {
  try {
    const data = req.body;

    // upsert the profile document for this user
    const updated = await UserProfile.findOneAndUpdate(
      { userId: req.session.userId },
      {
        $set: {
          fullName:          data.fullName,
          phone:             data.phone,
          dob:               data.dob,
          shippingAddresses: data.shippingAddresses,
          billingAddress:    data.billingAddress,
          paymentMethods:    data.paymentMethods
        }
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    res.json(updated);
  } catch (err) {
    console.error('Profile PUT error:', err);
    res.status(500).json({ error: 'Failed to save profile' });
  }
});

module.exports = router;
