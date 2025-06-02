const request = require('supertest');
const express = require('express');

const mockMagazines = [{ title: 'Test Magazine', editor: 'Editor' }];
const newMagazine = { title: 'New Magazine', issn: '1234', price: 5, editor: 'Editor' };

jest.mock('../../../controller/MagazineController', () => ({
  getMagazines: (req, res) => res.json(mockMagazines),
  createMagazine: (req, res) => res.status(201).json(newMagazine),
  updateMagazine: jest.fn(),
  deleteMagazine: jest.fn(),
  renderCatalog: jest.fn(),
}));

const MagazineRoute = require('../../../routes/MagazineRoute');

const app = express();
app.use(express.json());
app.use('/magazine', MagazineRoute);

describe('MagazineRoute', () => {
  describe('GET /magazine', () => {
    it('should return a list of magazines (mocked)', async () => {
      const res = await request(app).get('/magazine');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockMagazines);
    });
  });

  describe('POST /magazine', () => {
    it('should create a new magazine (mocked)', async () => {
      const res = await request(app).post('/magazine').send(newMagazine);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(newMagazine);
    });
  });

  describe('GET /magazine/catalog', () => {
    it('should render the magazine catalog (mocked)', async () => {
      const MagazineController = require('../../../controller/MagazineController');
      MagazineController.renderCatalog.mockImplementation((req, res) => res.status(200).send('ok'));
      const res = await request(app).get('/magazine/catalog');
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('ok');
      expect(MagazineController.renderCatalog).toHaveBeenCalled();
    });
  });

  describe('PUT /magazine/:id', () => {
    it('should update a magazine (mocked)', async () => {
      const MagazineController = require('../../../controller/MagazineController');
      MagazineController.updateMagazine.mockImplementation((req, res) => res.json({ success: true }));
      const res = await request(app).put('/magazine/1').send({ title: 'Updated' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ success: true });
      expect(MagazineController.updateMagazine).toHaveBeenCalled();
    });
  });

  describe('DELETE /magazine/:id', () => {
    it('should delete a magazine (mocked)', async () => {
      const MagazineController = require('../../../controller/MagazineController');
      MagazineController.deleteMagazine.mockImplementation((req, res) => res.json({ deleted: true }));
      const res = await request(app).delete('/magazine/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ deleted: true });
      expect(MagazineController.deleteMagazine).toHaveBeenCalled();
    });
  });
});
