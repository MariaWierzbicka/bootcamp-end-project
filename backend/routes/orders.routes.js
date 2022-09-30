const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

router.post('/orders', async (req, res) => {
  try {
    const { name, email, address, phone, products, total } = req.body;
    const newOrder = new Order({
      name: name,
      email: email,
      address: address,
      phone: phone,
      products: products,
      total: total
    });

    await newOrder.save();
    res.json({ message: newOrder });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
