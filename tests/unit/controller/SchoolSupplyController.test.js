const SchoolSupplyController = require('../../../controller/SchoolSupplyController');
const SchoolSupply = require('../../../model/SchoolSupply');
const db = require('../../../model/Database');

jest.mock('../../../model/Database');
jest.mock('../../../model/SchoolSupply');

describe('SchoolSupplyController', () => {
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

  describe('getSchoolSupply', () => {
    it('should return school supplies as JSON', async () => {
      const supplies = [{ SchoolSupplyId: '1' }, { SchoolSupplyId: '2' }];
      db.readJSON.mockResolvedValue(supplies);

      await SchoolSupplyController.getSchoolSupply(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(supplies);
    });

    it('should handle errors and return 500', async () => {
      db.readJSON.mockRejectedValue(new Error('fail'));

      await SchoolSupplyController.getSchoolSupply(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('createSchoolSupply', () => {
    it('should create a school supply and return 201', async () => {
      req.body = {
        name: 'Pencil',
        price: 1,
        section: 'A',
        stock: 100,
        brand: 'BrandX',
        description: 'HB pencil'
      };
      const supplies = [];
      db.readJSON.mockResolvedValue(supplies);
      const mockSupply = { ...req.body, SchoolSupplyId: '1' };
      SchoolSupply.mockImplementation(() => mockSupply);
      db.writeJSON.mockResolvedValue();

      const realDateNow = Date.now;
      Date.now = jest.fn(() => 1);

      await SchoolSupplyController.createSchoolSupply(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(SchoolSupply).toHaveBeenCalledWith(
        '1',
        req.body.name,
        req.body.price,
        req.body.section,
        req.body.stock,
        req.body.brand,
        req.body.description
      );
      expect(db.writeJSON).toHaveBeenCalledWith(expect.any(String), [mockSupply]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSupply);

      Date.now = realDateNow;
    });

    it('should return 400 if required fields are missing', async () => {
      req.body = { name: '', price: null, brand: '' };

      await SchoolSupplyController.createSchoolSupply(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Faltan campos obligatorios' });
    });

    it('should handle errors and return 500', async () => {
      req.body = {
        name: 'Pencil',
        price: 1,
        section: 'A',
        stock: 100,
        brand: 'BrandX',
        description: 'HB pencil'
      };
      db.readJSON.mockRejectedValue(new Error('fail'));

      await SchoolSupplyController.createSchoolSupply(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('updateSchoolSupply', () => {
    it('should update a school supply and return it', async () => {
      req.params.id = '1';
      req.body = {
        name: 'Pen',
        price: 2,
        section: 'B',
        stock: 50,
        brand: 'BrandY',
        description: 'Blue pen'
      };
      const supplies = [{ SchoolSupplyId: '1', name: 'Old' }];
      db.readJSON.mockResolvedValue(supplies);
      db.writeJSON.mockResolvedValue();

      await SchoolSupplyController.updateSchoolSupply(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(db.writeJSON).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'Pen' }));
    });

    it('should return 404 if school supply not found', async () => {
      req.params.id = '2';
      req.body = {};
      db.readJSON.mockResolvedValue([{ SchoolSupplyId: '1' }]);

      await SchoolSupplyController.updateSchoolSupply(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Util Escolar no encontrado' });
    });
  });

  describe('deleteSchoolSupply', () => {
    it('should delete a school supply and return a message', async () => {
      req.params.id = '1';
      const supplies = [{ SchoolSupplyId: '1' }, { SchoolSupplyId: '2' }];
      db.readJSON.mockResolvedValue(supplies);
      db.writeJSON.mockResolvedValue();

      await SchoolSupplyController.deleteSchoolSupply(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(db.writeJSON).toHaveBeenCalledWith(expect.any(String), [{ SchoolSupplyId: '2' }]);
      expect(res.json).toHaveBeenCalledWith({ message: 'Util Escolar eliminado' });
    });
  });

  describe('renderCatalog', () => {
    it('should render the catalog with school supplies', async () => {
      const supplies = [{ name: 'Pencil' }];
      db.readJSON.mockResolvedValue(supplies);

      await SchoolSupplyController.renderCatalog(req, res);

      expect(res.render).toHaveBeenCalledWith('SchoolSupplyCatalog', { schoolSupplies: supplies });
    });

    it('should handle errors and return 500', async () => {
      db.readJSON.mockRejectedValue(new Error('fail'));

      await SchoolSupplyController.renderCatalog(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error al cargar el catálogo de útiles escolares');
    });
  });
});