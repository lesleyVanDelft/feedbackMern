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
		res.status(401).redirect('http://localhost:3000/login');
	}

	// if (token) {
	// 	jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
	// 		if (err) {
	// 			console.log(err.message + 'checkUser mw');

	// 		} else {

	// 			let user = await User.findById(decodedToken.id);

	// 			req.user = user;
	// 			console.log(user + 'checkUser');

	// 			next();
	// 		}
	// 	});
	// } else {
	// 	res.status(401).redirect('http://localhost:3000/login');
	// }

	// next();
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

	// if (!token) {
	// 	res.status(401).send('No token.');
	// }
});
// const refresh = asyncHandler(async (req, res, next) => {});

module.exports = { checkUser, protect };
