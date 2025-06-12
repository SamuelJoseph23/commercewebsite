const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Make sure signup and login exist in the controller
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
