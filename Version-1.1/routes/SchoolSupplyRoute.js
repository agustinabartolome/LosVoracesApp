const express = require('express');
const router = express.Router();
const schoolSupplyController = require('../controller/SchoolSupplyController');

router.get('/catalog', schoolSupplyController.renderCatalog);

router.get('/', schoolSupplyController.getSchoolSupplies);
router.post('/', schoolSupplyController.createSchoolSupply);
router.put('/:id', schoolSupplyController.updateSchoolSupply);
router.delete('/:id', schoolSupplyController.deleteSchoolSupply);

router.patch('/:id/stock', schoolSupplyController.updateSchoolSupplyStock);

module.exports = router;