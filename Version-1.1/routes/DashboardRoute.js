const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/AuthMiddleware');

router.get('/dashboard', authenticateToken, (req, res) => {
  
  res.render('dashboard', { user: req.user });
});

module.exports = router;
