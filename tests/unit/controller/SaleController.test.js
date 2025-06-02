const SaleController = require('../../../controller/SaleController');
const Sale = require('../../../model/Sale');
const db = require('../../../model/Database');

jest.mock('../../../model/Database');
jest.mock('../../../model/Sale');

describe('SaleController', () => {
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

  describe('getSales', () => {
    it('should return sales as JSON', async () => {
      const sales = [{ saleId: '1' }, { saleId: '2' }];
      db.readJSON.mockResolvedValue(sales);

      await SaleController.getSales(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(sales);
    });

    it('should handle errors and return 500', async () => {
      db.readJSON.mockRejectedValue(new Error('fail'));

      await SaleController.getSales(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('createSale', () => {
    it('should create a sale and return 201', async () => {
      req.body = {
        product: 'p1',
        date: '2024-01-01',
        description: 'desc',
        category: 'cat',
        price: 10,
        quantityProduct: 2,
        total: 20
      };
      const sales = [];
      db.readJSON.mockResolvedValue(sales);
      const mockSale = { ...req.body, saleId: '1' };
      Sale.mockImplementation(() => mockSale);
      db.writeJSON.mockResolvedValue();

      const realDateNow = Date.now;
      Date.now = jest.fn(() => 1);

      await SaleController.createSale(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(Sale).toHaveBeenCalledWith(
        '1',
        req.body.product,
        req.body.date,
        req.body.description,
        req.body.category,
        req.body.price,
        req.body.quantityProduct,
        req.body.total
      );
      expect(db.writeJSON).toHaveBeenCalledWith(expect.any(String), [mockSale]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSale);

      Date.now = realDateNow;
    });

    it('should return 400 if required fields are missing', async () => {
      req.body = { product: '', date: '', description: '', category: '', price: null, quantityProduct: null, total: null };

      await SaleController.createSale(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Faltan campos obligatorios' });
    });

    it('should handle errors and return 500', async () => {
      req.body = {
        product: 'p1',
        date: '2024-01-01',
        description: 'desc',
        category: 'cat',
        price: 10,
        quantityProduct: 2,
        total: 20
      };
      db.readJSON.mockRejectedValue(new Error('fail'));

      await SaleController.createSale(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });

  describe('updateSale', () => {
    it('should update a sale and return it', async () => {
      req.params.id = '1';
      req.body = {
        product: 'p1',
        date: '2024-01-01',
        description: 'desc',
        category: 'cat',
        price: 10,
        quantityProduct: 2,
        total: 20
      };
      const sales = [{ saleId: '1', description: 'old' }];
      db.readJSON.mockResolvedValue(sales);
      db.writeJSON.mockResolvedValue();

      await SaleController.updateSale(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(db.writeJSON).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ description: 'desc' }));
    });

    it('should return 404 if sale not found', async () => {
      req.params.id = '2';
      req.body = {};
      db.readJSON.mockResolvedValue([{ saleId: '1' }]);

      await SaleController.updateSale(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Venta no encontrada' });
    });
  });

  describe('deleteSale', () => {
    it('should delete a sale and return a message', async () => {
      req.params.id = '1';
      const sales = [{ saleId: '1' }, { saleId: '2' }];
      db.readJSON.mockResolvedValue(sales);
      db.writeJSON.mockResolvedValue();

      await SaleController.deleteSale(req, res);

      expect(db.readJSON).toHaveBeenCalled();
      expect(db.writeJSON).toHaveBeenCalledWith(expect.any(String), [{ saleId: '2' }]);
      expect(res.json).toHaveBeenCalledWith({ message: 'Venta eliminada' });
    });
  });

  describe('getTopSellingProducts', () => {
    it('should return top selling products for the week by default', async () => {
      const now = new Date('2024-06-01');
      jest.spyOn(global, 'Date').mockImplementation(() => now);

      const sales = [
        { product: 'p1', date: '2024-05-30', quantityProduct: 2 },
        { product: 'p2', date: '2024-05-29', quantityProduct: 5 },
        { product: 'p1', date: '2024-05-28', quantityProduct: 3 },
        { product: 'p3', date: '2024-04-01', quantityProduct: 10 }
      ];
      db.readJSON.mockResolvedValue(sales);

      req.query = {}; // default range

      await SaleController.getTopSellingProducts(req, res);

      expect(res.json).toHaveBeenCalledWith([
        { productId: 'p3', quantity: 10 },
        { productId: 'p1', quantity: 5 },
        { productId: 'p2', quantity: 5 }
      ]);

      global.Date.mockRestore();
    });

    it('should return products even if no sales in range', async () => {
      const now = new Date('2024-06-01');
      jest.spyOn(global, 'Date').mockImplementation(() => now);

      db.readJSON.mockResolvedValue([
        { product: 'p1', date: '2024-01-01', quantityProduct: 2 }
      ]);
      req.query = {};

      await SaleController.getTopSellingProducts(req, res);

      expect(res.json).toHaveBeenCalledWith([
        { productId: 'p1', quantity: 2 }
      ]);

      global.Date.mockRestore();
    });

    it('should handle errors and return 500', async () => {
      db.readJSON.mockRejectedValue(new Error('fail'));
      await SaleController.getTopSellingProducts(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
    });
  });
});