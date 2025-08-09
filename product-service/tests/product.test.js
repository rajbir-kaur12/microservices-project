const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Recreate the app here for testing
const app = express();
app.use(bodyParser.json());

let products = [];
let idCounter = 1;

app.get('/health', (req, res) => {
  res.json({ status: 'Product Service is healthy' });
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ error: 'Name and price are required (price must be a number)' });
  }
  const newProduct = { id: idCounter++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

describe('Product Service API', () => {

  test('GET /health returns service status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Product Service is healthy');
  });

  test('GET /products returns empty array initially', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /products creates a new product', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Laptop', price: 999.99 });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Laptop');
    expect(res.body.price).toBe(999.99);
    expect(res.body.id).toBeDefined();
  });

  test('POST /products without name or invalid price returns 400', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'NoPrice' });
    expect(res.statusCode).toBe(400);
  });

});
