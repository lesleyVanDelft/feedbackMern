const express = require('express');
const { auth } = require('../utils/middleware');
const {
	getUser,
	setUserAvatar,
	removeUserAvatar,
} = require('../controllers/user');
const { loginUser, registerUser } = require('../controllers/auth');
const router = express.Router();

// router.get('/login');
// router.get('/register');
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/:username', getUser);
router.post('/avatar', auth, setUserAvatar);
router.delete('/avatar', auth, removeUserAvatar);

module.exports = router;
