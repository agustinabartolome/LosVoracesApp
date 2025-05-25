const express = require('express');
const router = express.Router();
const magazineController = require('../controller/MagazineController');

router.get('/catalog', magazineController.renderCatalog);

router.get('/', magazineController.getMagazines);
router.post('/', magazineController.createMagazine);
router.put('/:id', magazineController.updateMagazine);
router.delete('/:id', magazineController.deleteMagazine);

module.exports = router;