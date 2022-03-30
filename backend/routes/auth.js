const express = require('express');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// router.get('/register', registerUser_get);
router.post('/register', registerUser);
// router.get('/login', loginUser_get);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;
