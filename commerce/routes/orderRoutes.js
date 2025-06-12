const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/checkout', authMiddleware.authenticate, orderController.checkout);
router.get('/history', authMiddleware.authenticate, orderController.getOrderHistory);
router.get('/:id', authMiddleware.authenticate, orderController.getOrderDetails);

module.exports = router;