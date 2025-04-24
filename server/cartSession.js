// middlewares/cartSession.js
const Cart = require('../models/Cart');

module.exports = async (req, res, next) => {
  // If session doesn't exist, throw error
  if (!req.session) return res.status(500).send({ error: 'Session not initialized' });

  // If there's no cart in the session, create one
  if (!req.session.cartId) {
    const newCart = await Cart.create({ items: [] });
    req.session.cartId = newCart._id;
  }

  req.cartId = req.session.cartId;
  next();
};

