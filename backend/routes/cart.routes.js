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

// router.post = async (req, res) => {
//   const { performer, genre, price, day, image } = req.body;

//   try {
//     const newConcert = new Concert({
//       performer: clean, 
//       genre: genre,
//       price: price,
//       day: day,
//       image: image  
//     });
//     console.log(newConcert);
//     await newConcert.save();
//     res.json({ message: 'OK' });
//   }
//   catch(err) {
//     res.status(500).json({ message: err });
//   }
// };

module.exports = router;