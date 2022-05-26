const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getCurrentUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/currentUser', protect, getCurrentUser);
router.get('/:id', protect, getCurrentUser);
module.exports = router;
