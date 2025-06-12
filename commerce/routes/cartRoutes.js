const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth.authenticate, cartController.getCart);
router.post('/add', auth.authenticate, cartController.addToCart);
router.post('/remove', auth.authenticate, cartController.removeFromCart);

module.exports = router;
