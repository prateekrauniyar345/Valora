// server/models/Product.js
const mongoose = require('../db/main');  // pulls in the connected mongoose
// or: const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id:                 { type: Number, index: true },
  gender:             String,
  masterCategory:     String,
  subCategory:        String,
  articleType:        String,
  baseColour:         String,
  season:             String,
  year:               Number,
  usage:              String,
  productDisplayName: String,
  rating:             Number,
  filename:           Number,
  link:               String,
  price:              Number,
  in_stock:           Number,
  size_XS:            Number,
  size_S:             Number,
  size_M:             Number,
  size_L:             Number,
  size_XL:            Number,
  size_XXL:           Number,
  material:           String,
}, {
  collection: 'product-items',
  strict:     false,
  timestamps: false,
});

module.exports = mongoose.model('Product', productSchema);
