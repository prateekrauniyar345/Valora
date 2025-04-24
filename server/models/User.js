const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< Updated upstream
  firstName:   String,
  lastName:    String,
  userName:   { type: String, unique: true },
  email:      { type: String, unique: true },
  password:    String,
  address:     String,
  paymentInfo: String,
  billingInfo: String
=======
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,

  phoneNumber: String,

  address: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,

  billingName: String,
  billingAddress: String,

  cardNumber: String,
  expiryDate: String,
  cvv: String
>>>>>>> Stashed changes
});

module.exports = mongoose.model('User', userSchema);
