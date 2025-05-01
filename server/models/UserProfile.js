// server/models/UserProfile.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
  label:   { type: String, enum: ['Home','Office','Other'], required: true },
  line1:   { type: String, required: true },
  city:    { type: String, required: true },
  state:   { type: String, required: true },
  zip:     { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const PaymentMethodSchema = new Schema({
  method:           { type: String, required: true },
  cardType:         { type: String },
  cardNumberMasked: { type: String, required: true },
  expiryMonth:      { type: Number },
  expiryYear:       { type: Number },
  cvvHash:          { type: String }
}, { _id: false });

const UserProfileSchema = new Schema({
  userId:            { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName:          { type: String, required: true },
  phone:             { type: String },
  dob:               { type: Date },
  shippingAddresses: { type: [AddressSchema], default: [] },
  billingAddress:    { type: AddressSchema, required: false },
  paymentMethods:    { type: [PaymentMethodSchema], default: [] }
}, {
  collection: 'user_profiles',
  timestamps: true
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
