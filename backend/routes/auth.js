const express = require('express');
let User = require('../models/userModel');
const { loginUser, registerUser, logoutUser } = require('../controllers/auth');

const { protect } = require('../middleware/authMiddleware');
const { auth } = require('../utils/middleware');

const router = express.Router();

// router.route('/register').get(registerUser).post(registerUser)
// router.get('/login', (req, res) => {
// 	res.send('hi');
// });
router.get('/', (req, res) => {
	// if (req.user) {
	// res.redirect('/api/feedbacks');
	// } else {
	// 	res.redirect('/api/users/login');
	// }
	// User.find()
	// 	.then(users => res.json(users))
	// 	.catch(err => res.status(400).json('Error get login: ' + err));

	// res.redirect('/login');
	res.status(200);
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
