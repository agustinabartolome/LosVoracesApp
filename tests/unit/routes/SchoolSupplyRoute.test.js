const request = require('supertest');
const express = require('express');

const mockSupplies = [{ id: 1, name: 'Pencil', stock: 100 }];
const newSupply = { id: 2, name: 'Notebook', stock: 50 };

jest.mock('../../../controller/SchoolSupplyController', () => ({
  getSchoolSupply: (req, res) => res.json(mockSupplies),
  createSchoolSupply: (req, res) => res.status(201).json(newSupply),
  updateSchoolSupply: jest.fn(),
  deleteSchoolSupply: jest.fn(),
  renderCatalog: jest.fn(),
}));

const SchoolSupplyRoute = require('../../../routes/SchoolSupplyRoute');

const app = express();
app.use(express.json());
app.use('/schoolSupply', SchoolSupplyRoute);

describe('SchoolSupplyRoute', () => {
  describe('GET /schoolSupply', () => {
    it('should return a list of school supplies (mocked)', async () => {
      const res = await request(app).get('/schoolSupply');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockSupplies);
    });
  });

  describe('POST /schoolSupply', () => {
    it('should create a new school supply (mocked)', async () => {
      const res = await request(app).post('/schoolSupply').send(newSupply);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newSupply);
    });
  });

  describe('GET /schoolSupply/catalog', () => {
    it('should render the school supply catalog (mocked)', async () => {
      const SchoolSupplyController = require('../../../controller/SchoolSupplyController');
      SchoolSupplyController.renderCatalog.mockImplementation((req, res) => res.status(200).send('ok'));
      const res = await request(app).get('/schoolSupply/catalog');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('ok');
      expect(SchoolSupplyController.renderCatalog).toHaveBeenCalled();
    });
  });

  describe('PUT /schoolSupply/:id', () => {
    it('should update a school supply (mocked)', async () => {
      const SchoolSupplyController = require('../../../controller/SchoolSupplyController');
      SchoolSupplyController.updateSchoolSupply.mockImplementation((req, res) => res.json({ success: true }));
      const res = await request(app).put('/schoolSupply/1').send({ name: 'Updated' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ success: true });
      expect(SchoolSupplyController.updateSchoolSupply).toHaveBeenCalled();
    });
  });

  describe('DELETE /schoolSupply/:id', () => {
    it('should delete a school supply (mocked)', async () => {
      const SchoolSupplyController = require('../../../controller/SchoolSupplyController');
      SchoolSupplyController.deleteSchoolSupply.mockImplementation((req, res) => res.json({ deleted: true }));
      const res = await request(app).delete('/schoolSupply/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ deleted: true });
      expect(SchoolSupplyController.deleteSchoolSupply).toHaveBeenCalled();
    });
  });
});
