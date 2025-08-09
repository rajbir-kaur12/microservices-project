const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];
let idCounter = 1;

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
