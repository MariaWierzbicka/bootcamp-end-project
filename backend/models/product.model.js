const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: false }, 
  minPrice: { type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);