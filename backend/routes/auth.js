const express = require('express');
const {
	loginUser,
	loginUser_get,
	registerUser,
	registerUser_get,
	logoutUser,
} = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/register', registerUser_get);
router.post('/register', registerUser);
router.get('/login', loginUser_get);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
// router.get('/logout', logoutUser);

module.exports = router;
