const express = require('express');
const router = express.Router();
// const Product = require('../models/product.model');

router.get('/cartProducts', async (req, res) => {
  try {
    res.json({ message: 'ok' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;