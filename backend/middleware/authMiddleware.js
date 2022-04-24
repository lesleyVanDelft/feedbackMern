const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// check user
const checkUser = asyncHandler(async (req, res, next) => {
	let token;
	if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			console.log(decodedToken);
			if (err) {
				console.log(err.message + 'checkUser mw');
				// res.locals.user = null;
			} else {
				console.log(decodedToken);
				let user = await User.findById(decodedToken.id);
				// res.locals.user = user;s
				req.user = user;
				console.log(user + 'checkUser');
				// res.redirect('/');
				next();
			}
		});
		// res.redirect('/');
	}

	next();
});

const protect = asyncHandler(async (req, res, next) => {
	let token;

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
	}

	if (!token) {
		res.status(401).send('No token.');
	}
});
// const refresh = asyncHandler(async (req, res, next) => {});

module.exports = { checkUser, protect };
