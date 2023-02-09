const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// check user
const checkUser = async (req, res, next) => {
	let token;
	if (req.cookies.jwt) {
		token = req.cookies.jwt;
		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			let user = await User.findById(decodedToken.id).select('-password');
			req.user = user;
			// console.log(req.user);

			next();
		} catch (error) {
			console.log(error + ' checkUser mw');
		}
	} else {
		res.status(401).redirect('https://feedback-lesley.onrender.com/login');
	}
};

const protect = asyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.id).select('-password');

			next();
		} catch (err) {
			res.status(401).send('Token failed.');
		}
	} else {
		res.status(401).redirect('http://localhost:3000/login');
	}
});

module.exports = { checkUser, protect };
