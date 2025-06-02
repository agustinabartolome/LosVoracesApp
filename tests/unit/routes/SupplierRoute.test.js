const request = require('supertest');
const express = require('express');

const mockSuppliers = [{ id: 1, name: 'Supplier1', category: 'Books' }];
const newSupplier = { id: 2, name: 'Supplier2', category: 'Magazines' };
const mockSupplierById = { id: 1, name: 'Supplier1', category: 'Books' };
const mockSuppliersByCategory = [{ id: 3, name: 'Supplier3', category: 'Books' }];

jest.mock('../../../controller/SupplierController', () => ({
  getSuppliers: (req, res) => res.json(mockSuppliers),
  createSupplier: (req, res) => res.status(201).json(newSupplier),
  updateSupplier: jest.fn(),
  deleteSupplier: jest.fn(),
  getSupplierById: jest.fn(),
  getSuppliersByCategory: jest.fn(),
}));

const SupplierRoute = require('../../../routes/SupplierRoute');

const app = express();
app.use(express.json());
app.use('/supplier', SupplierRoute);

describe('SupplierRoute', () => {
  describe('GET /supplier', () => {
    it('should return a list of suppliers (mocked)', async () => {
      const res = await request(app).get('/supplier');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockSuppliers);
    });
  });

  describe('POST /supplier', () => {
    it('should create a new supplier (mocked)', async () => {
      const res = await request(app).post('/supplier').send(newSupplier);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newSupplier);
    });
  });

  describe('GET /supplier/supplier/:id', () => {
    it('should return a supplier by id (mocked)', async () => {
      const SupplierController = require('../../../controller/SupplierController');
      SupplierController.getSupplierById.mockImplementation((req, res) => res.json(mockSupplierById));
      const res = await request(app).get('/supplier/supplier/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockSupplierById);
      expect(SupplierController.getSupplierById).toHaveBeenCalled();
    });
  });

  describe('GET /supplier/supplier/category/:category', () => {
    it('should return suppliers by category (mocked)', async () => {
      const SupplierController = require('../../../controller/SupplierController');
      SupplierController.getSuppliersByCategory.mockImplementation((req, res) => res.json(mockSuppliersByCategory));
      const res = await request(app).get('/supplier/supplier/category/Books');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockSuppliersByCategory);
      expect(SupplierController.getSuppliersByCategory).toHaveBeenCalled();
    });
  });

  describe('PUT /supplier/:id', () => {
    it('should update a supplier (mocked)', async () => {
      const SupplierController = require('../../../controller/SupplierController');
      SupplierController.updateSupplier.mockImplementation((req, res) => res.json({ success: true }));
      const res = await request(app).put('/supplier/1').send({ name: 'Updated' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ success: true });
      expect(SupplierController.updateSupplier).toHaveBeenCalled();
    });
  });

  describe('DELETE /supplier/:id', () => {
    it('should delete a supplier (mocked)', async () => {
      const SupplierController = require('../../../controller/SupplierController');
      SupplierController.deleteSupplier.mockImplementation((req, res) => res.json({ deleted: true }));
      const res = await request(app).delete('/supplier/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ deleted: true });
      expect(SupplierController.deleteSupplier).toHaveBeenCalled();
    });
  });
});
