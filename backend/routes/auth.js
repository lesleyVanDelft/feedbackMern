const express = require('express');
const res = require('express/lib/response');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth');
const { protect } = require('../middleware/authMiddleware');
const { auth } = require('../utils/middleware');

const router = express.Router();

// router.route('/register').get(registerUser).post(registerUser)
// router.get('/login', (req, res) => {
// 	res.send('hi');
// });
router.get('/login', (req, res) => {
	res.send('hi');
	// res.redirect('/login');
});
router.post('/login', loginUser);
// router.get('/login', (req, res) => {
// 	res.redirect('/login');
// });
router.get('/logout', logoutUser);

router.get('/register', registerUser);
router.post('/register', registerUser);
// router.get('/', loginUser);

module.exports = router;
