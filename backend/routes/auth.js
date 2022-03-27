const express = require('express');
const { loginUser, registerUser } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
