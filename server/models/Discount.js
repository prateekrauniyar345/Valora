// models/Discount.js
const mongoose = require('../db/main');

const discountSchema = new mongoose.Schema({
  id: Number,
  gender: String,
  masterCategory: String,
  subCategory: String,
  articleType: String,
  baseColour: String,
  season: String,
  year: Number,
  usage: String,
  productDisplayName: String,
  rating: Number,
  filename: Number,
  link: String,
  price: Number,
  in_stock: Number,
  size_XS: Number,
  size_S: Number,
  size_M: Number,
  size_L: Number,
  size_XL: Number,
  size_XXL: Number,
  material: String,
  discountCode: {
    type: String,
    required: true
  }
}, {
  collection: 'discounts', // explicitly name the collection
  timestamps: true         // optional: adds createdAt and updatedAt
});

module.exports = mongoose.model('Discount', discountSchema);
