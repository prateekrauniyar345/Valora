// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('User', userSchema);
