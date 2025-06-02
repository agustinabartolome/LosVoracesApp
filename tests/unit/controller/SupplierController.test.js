const SupplierController = require('../../../controller/SupplierController');
const Supplier = require('../../../model/Supplier');
const db = require('../../../model/Database');

jest.mock('../../../model/Database');
jest.mock('../../../model/Supplier');

describe('SupplierController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      render: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getSuppliers', () => {
    it('should return suppliers as JSON', async () => {
      const suppliers = [{ supplierId: '1' }, { supplierId: '2' }];
      db.readJSON.mockResolvedValue(suppliers);

      await SupplierController.getSuppliers(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(suppliers);
    });

    it('should handle errors and return 500', async () => {
      db.readJSON.mockRejectedValue(new Error('fail'));

      await SupplierController.getSuppliers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('createSupplier', () => {
    it('should create a supplier and return 201', async () => {
      req.body = {
        name: 'Supplier1',
        phoneNumber: '123456789',
        email: 'test@example.com',
        category: 'Books',
        catalog: []
      };
      const suppliers = [];
      db.readJSON.mockResolvedValue(suppliers);
      const mockSupplier = { ...req.body, supplierId: '1' };
      Supplier.mockImplementation(() => mockSupplier);
      db.writeJSON.mockResolvedValue();

      const realDateNow = Date.now;
      Date.now = jest.fn(() => 1);

      await SupplierController.createSupplier(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(Supplier).toHaveBeenCalledWith(
        '1',
        req.body.name,
        req.body.phoneNumber,
        req.body.email,
        req.body.category,
        req.body.catalog
      );
      expect(db.writeJSON).toHaveBeenCalledWith(expect.any(String), [mockSupplier]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSupplier);

      Date.now = realDateNow;
    });

    it('should return 400 if required fields are missing', async () => {
      req.body = { name: '', phoneNumber: '', email: '', category: '', catalog: '' };

      await SupplierController.createSupplier(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Faltan campos obligatorios' });
    });

    it('should handle errors and return 500', async () => {
      req.body = {
        name: 'Supplier1',
        phoneNumber: '123456789',
        email: 'test@example.com',
        category: 'Books',
        catalog: []
      };
      db.readJSON.mockRejectedValue(new Error('fail'));

      await SupplierController.createSupplier(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('updateSupplier', () => {
    it('should update a supplier and return it', async () => {
      req.params.id = '1';
      req.body = {
        name: 'Updated',
        phoneNumber: '987654321',
        email: 'updated@example.com',
        category: 'Magazines',
        catalog: []
      };
      const suppliers = [{ id: '1', name: 'Old' }];
      db.readJSON.mockResolvedValue(suppliers);
      db.writeJSON.mockResolvedValue();

      await SupplierController.updateSupplier(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(db.writeJSON).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'Updated' }));
    });

    it('should return 404 if supplier not found', async () => {
      req.params.id = '2';
      req.body = {};
      db.readJSON.mockResolvedValue([{ id: '1' }]);

      await SupplierController.updateSupplier(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Proveedor no encontrado' });
    });
  });

  describe('deleteSupplier', () => {
    it('should delete a supplier and return a message', async () => {
      req.params.id = '1';
      const suppliers = [{ supplierId: '1' }, { supplierId: '2' }];
      db.readJSON.mockResolvedValue(suppliers);
      db.writeJSON.mockResolvedValue();

      await SupplierController.deleteSupplier(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(db.writeJSON).toHaveBeenCalledWith(expect.any(String), [{ supplierId: '2' }]);
      expect(res.json).toHaveBeenCalledWith({ messaje: 'Proveedor eliminado' });
    });
  });

  describe('getSuppliersByCategory', () => {
    it('should return suppliers filtered by category', async () => {
      req.params.category = 'books';
      const suppliers = [
        { supplierId: '1', category: 'Books' },
        { supplierId: '2', category: 'Magazines' }
      ];
      db.readJSON.mockResolvedValue(suppliers);

      await SupplierController.getSuppliersByCategory(req, res);

      expect(res.json).toHaveBeenCalledWith([
        { supplierId: '1', category: 'Books' }
      ]);
    });
  });

  describe('getSupplierById', () => {
    it('should return a supplier by id', async () => {
      req.params.id = '1';
      const suppliers = [{ supplierId: '1', name: 'Supplier1' }];
      db.readJSON.mockResolvedValue(suppliers);

      await SupplierController.getSupplierById(req, res);

      expect(res.json).toHaveBeenCalledWith({ supplierId: '1', name: 'Supplier1' });
    });

    it('should return 404 if supplier not found', async () => {
      req.params.id = '3';
      db.readJSON.mockResolvedValue([{ supplierId: '1' }]);

      await SupplierController.getSupplierById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Proveedor no encontrado' });
    });
  });
});