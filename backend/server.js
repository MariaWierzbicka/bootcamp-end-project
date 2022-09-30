const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');


const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', productsRoutes);
app.use('/api', ordersRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

mongoose.connect('mongodb://127.0.0.1:27017/shopDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});