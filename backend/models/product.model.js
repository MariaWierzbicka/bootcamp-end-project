const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  additionalPhotos: {type: Array, required: false },
  minPrice: { type: Number, required: true },
  options: { type: Array, required: true }
});

module.exports = mongoose.model('Product', productSchema);