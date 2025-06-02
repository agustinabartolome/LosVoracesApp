const request = require('supertest');
const express = require('express');

const mockSales = [{ id: 1, product: 'Book', quantity: 2 }];
const newSale = { id: 2, product: 'Magazine', quantity: 1 };
const mockTopProducts = [{ product: 'Book', totalSold: 10 }];

jest.mock('../../../controller/SaleController', () => ({
  getSales: (req, res) => res.json(mockSales),
  createSale: (req, res) => res.status(201).json(newSale),
  updateSale: jest.fn(),
  deleteSale: jest.fn(),
  getTopSellingProducts: jest.fn(),
}));

const SaleRoute = require('../../../routes/SaleRoute');

const app = express();
app.use(express.json());
app.use('/sale', SaleRoute);

describe('SaleRoute', () => {
  describe('GET /sale', () => {
    it('should return a list of sales (mocked)', async () => {
      const res = await request(app).get('/sale');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockSales);
    });
  });

  describe('POST /sale', () => {
    it('should create a new sale (mocked)', async () => {
      const res = await request(app).post('/sale').send(newSale);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newSale);
    });
  });

  describe('PUT /sale/:id', () => {
    it('should update a sale (mocked)', async () => {
      const SaleController = require('../../../controller/SaleController');
      SaleController.updateSale.mockImplementation((req, res) => res.json({ success: true }));
      const res = await request(app).put('/sale/1').send({ product: 'Updated' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ success: true });
      expect(SaleController.updateSale).toHaveBeenCalled();
    });
  });

  describe('DELETE /sale/:id', () => {
    it('should delete a sale (mocked)', async () => {
      const SaleController = require('../../../controller/SaleController');
      SaleController.deleteSale.mockImplementation((req, res) => res.json({ deleted: true }));
      const res = await request(app).delete('/sale/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ deleted: true });
      expect(SaleController.deleteSale).toHaveBeenCalled();
    });
  });

  describe('GET /sale/top-products', () => {
    it('should return top selling products (mocked)', async () => {
      const SaleController = require('../../../controller/SaleController');
      SaleController.getTopSellingProducts.mockImplementation((req, res) => res.json(mockTopProducts));
      const res = await request(app).get('/sale/top-products');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockTopProducts);
      expect(SaleController.getTopSellingProducts).toHaveBeenCalled();
    });
  });
});
