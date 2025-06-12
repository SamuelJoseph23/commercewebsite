const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.authenticate, cartController.getCart);
router.post('/add', authMiddleware.authenticate, cartController.addToCart);
router.delete('/remove/:productId', authMiddleware.authenticate, cartController.removeFromCart);
router.delete('/clear', authMiddleware.authenticate, cartController.clearCart);

module.exports = router;