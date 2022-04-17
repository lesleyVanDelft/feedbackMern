const express = require('express');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');
const { auth } = require('../utils/middleware');

const router = express.Router();

router.get('/register', registerUser);
router.post('/register', registerUser);
router.get('/login', loginUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;
