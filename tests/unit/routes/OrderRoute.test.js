const request = require('supertest');
const express = require('express');

const mockOrders = [{ id: 1, product: 'Book', quantity: 2 }];
const newOrder = { id: 2, product: 'Magazine', quantity: 1 };

jest.mock('../../../controller/OrderController', () => ({
  getOrders: (req, res) => res.json(mockOrders),
  createOrder: (req, res) => res.status(201).json(newOrder),
  updateOrder: jest.fn(),
  deleteOrder: jest.fn(),
}));

const OrderRoute = require('../../../routes/OrderRoute');

const app = express();
app.use(express.json());
app.use('/order', OrderRoute);

describe('OrderRoute', () => {
  describe('GET /order', () => {
    it('should return a list of orders (mocked)', async () => {
      const res = await request(app).get('/order');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockOrders);
    });
  });

  describe('POST /order', () => {
    it('should create a new order (mocked)', async () => {
      const res = await request(app).post('/order').send(newOrder);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newOrder);
    });
  });

  describe('PUT /order/:id', () => {
    it('should update an order (mocked)', async () => {
      const OrderController = require('../../../controller/OrderController');
      OrderController.updateOrder.mockImplementation((req, res) => res.json({ success: true }));
      const res = await request(app).put('/order/1').send({ product: 'Updated' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ success: true });
      expect(OrderController.updateOrder).toHaveBeenCalled();
    });
  });

  describe('DELETE /order/:id', () => {
    it('should delete an order (mocked)', async () => {
      const OrderController = require('../../../controller/OrderController');
      OrderController.deleteOrder.mockImplementation((req, res) => res.json({ deleted: true }));
      const res = await request(app).delete('/order/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ deleted: true });
      expect(OrderController.deleteOrder).toHaveBeenCalled();
    });
  });
});
