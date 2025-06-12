const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// GET /profile
router.get('/profile', authMiddleware.authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

module.exports = router;
