const express = require('express');
const router = express.Router();
const SaleController = require('../controller/SaleController');
const { authenticateToken, authorizeRole } = require('../middleware/AuthMiddleware');

router.get('/', authenticateToken, SaleController.getSales);
router.post('/', authenticateToken, SaleController.createSale);
router.put('/:id', authenticateToken, authorizeRole('owner'), SaleController.updateSale);
router.delete('/:id', authenticateToken, authorizeRole('owner'), SaleController.deleteSale);
router.get('/top-products', authenticateToken, authorizeRole('owner'), SaleController.getTopSellingProducts);

module.exports = router;