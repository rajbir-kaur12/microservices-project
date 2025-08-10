const express = require('express');
const app = express();

app.use(express.json());

// In-memory order storage (for testing/demo only)
const orders = [
  { id: 201, user: 'Alice', product: 'Laptop' },
  { id: 202, user: 'Bob', product: 'Phone' }
];

// GET /orders - list all orders
app.get('/orders', (req, res) => {
  res.status(200).json(orders);
});

// GET /orders/:id - get order by id
app.get('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.status(200).json(order);
});

// POST /orders - create a new order
app.post('/orders', (req, res) => {
  const newOrder = req.body;
  newOrder.id = orders.length ? orders[orders.length - 1].id + 1 : 201;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});


