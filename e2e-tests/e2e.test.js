const request = require('supertest');

const userServiceUrl = 'http://localhost:3000';
const productServiceUrl = 'http://localhost:4000';

describe('Microservices End-to-End Tests', () => {
  let createdUser;
  let createdProduct;

  test('Create a new user', async () => {
    const res = await request(userServiceUrl)
      .post('/users')
      .send({ name: 'E2E User', email: 'e2e@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('E2E User');
    createdUser = res.body;
  });

  test('Create a new product', async () => {
    const res = await request(productServiceUrl)
      .post('/products')
      .send({ name: 'E2E Product', price: 100 });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('E2E Product');
    createdProduct = res.body;
  });

  test('Retrieve users list including created user', async () => {
    const res = await request(userServiceUrl).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: createdUser.id })])
    );
  });

  test('Retrieve products list including created product', async () => {
    const res = await request(productServiceUrl).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: createdProduct.id })])
    );
  });
});
