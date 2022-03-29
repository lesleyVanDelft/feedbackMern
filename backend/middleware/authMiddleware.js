const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
	const token = req.cookies.jwt;

	// check jwt exists and verified
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
});

// check user
const checkUser = (req, res, next) => {
	const token = req.cookies.token;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				console.log(decodedToken);
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

// const refresh = asyncHandler(async (req, res, next) => {});

module.exports = { protect, checkUser };
