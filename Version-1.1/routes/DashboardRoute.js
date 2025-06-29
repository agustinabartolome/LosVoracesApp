const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/AuthMiddleware');

router.get('/dashboard', authenticateToken, authorizeRole('owner', 'manager'), (req, res) => {
  res.render('dashboard', { user: req.user });
});

module.exports = router;
