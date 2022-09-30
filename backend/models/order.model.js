const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  products: { type: Array, required: false },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);