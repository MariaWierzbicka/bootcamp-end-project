const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mongoose = require('mongoose');


const productsRoutes = require('./routes/products.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', productsRoutes);


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