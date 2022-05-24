const express = require('express');
let User = require('../models/userModel');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');
const { auth } = require('../utils/middleware');
const { getUser } = require('../controllers/user');

const router = express.Router();

router.get('/user', getUser);
router.post('/login', loginUser);
// router.get('/login', (req, res) => {
// 	res.redirect('/login');
// });
router.get('/logout', logoutUser);

router.get('/register', registerUser);
router.post('/register', registerUser);
// router.get('/', loginUser);

module.exports = router;
