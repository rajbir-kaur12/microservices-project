const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');  // import node-fetch

const app = express();
app.use(bodyParser.json());

let users = [];
let idCounter = 1;

// Collect default system metrics (CPU, memory, etc.)
// client.collectDefaultMetrics();

// Existing endpoints...

// New endpoint: Get products for a user by calling product-service
app.get('/users/:id/products', async (req, res) => {
  try {
    // Call product-service using service name in Docker network
    const response = await fetch('http://product-service:4000/products');
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch products from product service' });
    }
    const products = await response.json();
    res.json({
      userId: req.params.id,
      products: products
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products from product service' });
  }
});

// Expose /metrics endpoint for Prometheus to scrape
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'User Service is healthy' });
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if(!name || !email){
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = { id: idCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});


