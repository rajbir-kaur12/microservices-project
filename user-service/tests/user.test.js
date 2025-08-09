const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Recreate the app here for testing
const app = express();
app.use(bodyParser.json());

let users = [];
let idCounter = 1;

app.get('/health', (req, res) => {
  res.json({ status: 'User Service is healthy' });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if(!name || !email){
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newUser = { id: idCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

describe('User Service API', () => {

  test('GET /health returns service status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('User Service is healthy');
  });

  test('GET /users returns empty array initially', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /users creates a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Rajbir', email: 'rajbir@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Rajbir');
    expect(res.body.email).toBe('rajbir@example.com');
    expect(res.body.id).toBeDefined();
  });

  test('POST /users without name or email returns 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'NoEmail' });
    expect(res.statusCode).toBe(400);
  });

});
