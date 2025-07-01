const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');

const { authenticateToken } = require('../middleware/AuthMiddleware');

router.get('/me', authenticateToken, (req, res) => {
  res.json({ username: req.user.username, role: req.user.role });
});

/*
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});
*/

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/logout', (req, res) => {
  res.clearCookie('token'); 
  res.redirect('/auth/login');
});

module.exports = router;

