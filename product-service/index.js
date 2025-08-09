const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let products = [];
let idCounter = 1;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Product Service is healthy' });
});

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if(!name || typeof price !== 'number'){
    return res.status(400).json({ error: 'Name and price are required (price must be a number)' });
  }
  const newProduct = { id: idCounter++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});
