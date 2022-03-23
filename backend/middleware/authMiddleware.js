const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
	let token;

	// if (
	// 	req.headers.authorization &&
	// 	req.headers.authorization.startsWith('Bearer')
	// ) {
	// 	try {
	// 		// get token from header
	// 		token = req.headers.authorization.split(' ')[1];

	// 		// verify token
	// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);
	// 		// console.log(decoded);
	// 		// get user from the token
	// 		req.user = await User.findById(decoded.id).select('-password');

	// 		next();
	// 	} catch (error) {
	// 		console.log(error);
	// 		res.status(401);

	// 		throw new Error('Not authorized bruh, token malformed or smt');
	// 	}
	// } else if (!token) {
	// 	res.status(401);
	// 	throw new Error('Not authorized, no token / authmiddleware');
	// }
	if (req.cookies) token = req.cookies.jwt;
	if (!token || token === 'expiredtoken') {
		return res.status(401).json({
			status: 'unauthorized',
			message: 'You are not authorized to view this content 1',
		});
	}
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decoded.id).select('-password');
	// console.log(decoded);
	const user = await User.findById(decoded.id);
	if (!user) {
		return res.status(401).json({
			status: 'unauthorized',
			message: 'You are not authorized to view this content 2',
		});
	}
	next();
});

const refresh = asyncHandler(async (req, res, next) => {});

module.exports = { protect };
