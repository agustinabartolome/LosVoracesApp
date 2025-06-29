const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

module.exports = router;
