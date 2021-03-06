const express = require('express');
let User = require('../models/userModel');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');
const { auth } = require('../utils/middleware');
const { getUser, changePassword } = require('../controllers/user');

const app = express();
const router = express.Router();

// Current user
router.get('/user/:userId', getUser);
router.patch('/:userId', changePassword);
// router.patch('/user', (req, res) => {
// 	console.log(req);
// });
// Login
router.post('/login', loginUser);

// Logout
router.get('/logout', logoutUser);

// Register
router.get('/register', registerUser);
router.post('/register', registerUser);

module.exports = router;
