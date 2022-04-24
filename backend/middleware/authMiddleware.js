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
	const token = req.cookies.jwt;

	// check jwt exists and verified
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				// res.redirect('/login');
			} else {
				console.log(decodedToken);
				res.redirect('/login');
			}
		});
		next();
	} else {
		res.redirect(401, '/login');
		console.log('protect failed authmiddle backend');
	}
});
// const refresh = asyncHandler(async (req, res, next) => {});

module.exports = { checkUser, protect };
