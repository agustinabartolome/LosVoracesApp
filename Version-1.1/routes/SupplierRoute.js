const express = require('express');
const router = express.Router();
const SupplierController = require('../controller/SupplierController');
const { authenticateToken, authorizeRole } = require('../middleware/AuthMiddleware');

router.get('/supplier/:id', authenticateToken, authorizeRole('owner'), SupplierController.getSupplierById);
router.get('/supplier/category/:category', authenticateToken, authorizeRole('owner'), SupplierController.getSuppliersByCategory);

router.get('/', authenticateToken, SupplierController.getSuppliers);
router.post('/', authenticateToken, authorizeRole('owner'), SupplierController.createSupplier);
router.put('/:id', authenticateToken, authorizeRole('owner'), SupplierController.updateSupplier);
router.delete('/:id', authenticateToken, authorizeRole('owner'), SupplierController.deleteSupplier);

router.patch('/:id/catalog', SupplierController.addToCatalog); 
router.delete('/:id/catalog/:itemId', SupplierController.removeFromCatalog);

module.exports = router;