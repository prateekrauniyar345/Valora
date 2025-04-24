// routes/orders.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('🧾 Order route placeholder');
});

module.exports = router;
