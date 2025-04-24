// models/Cart.js
const mongoose = require('../db/main'); 

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty:       { type: Number, default: 1, min: 1 },
  size:      { type: String },
  color:     { type: String }
}, { _id: false });

const CartSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  items:     { type: [CartItemSchema], default: [] },
  updatedAt: { type: Date, default: Date.now }
}, {
    collection: 'carts',
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);