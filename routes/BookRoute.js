const express = require('express');
const router = express.Router();
const bookController = require('../controller/BookController');

router.get('/catalog', bookController.renderCatalog);

router.get('/', bookController.getBooks);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;