const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { promisify } = require('util');

// copy user controller from reddish clone

// JWT
//////////////////////////////////////
// decode the JWT giving access to
// user.id, initiation time, and the expiration
// const decryptJwt = async token => {
// 	const jwtVerify = promisify(jwt.verify);
// 	return await jwtVerify(token, process.env.JWT_SECRET);
// };

// // create valid jwt
// const signJwt = id => {
// 	return jwt.sign({ id }, process.env.JWT_SECRET, {
// 		expiresIn: '30d',
// 	});
// };

// // set jwt options and send jwt as a cookie
// const sendToken = (user, statusCode, req, res) => {
// 	const token = signJwt(user._id);
// 	const options = {
// 		expires: new Date(Date.now() + 14 * 1000 * 60 * 60 * 24),
// 		// secure: NODE_ENV === 'prodution' ? true : false,
// 		httpOnly: process.env.NODE_ENV === 'production' ? true : false,
// 	};
// 	res.cookie('jwt', token, options);

// 	user.password = undefined;

// 	res.status(statusCode).json({
// 		user,
// 	});
// };
// JWT

//@desc  register new user
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, username } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	//Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists with that email');
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		name,
		email,
		username,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			username: user.username,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//@desc  Authenticate a user
//@route  POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	try {
		// check for user email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Login Failed' });
		}
		const compared = await bcrypt.compare(password, user.password);
		compared
			? sendToken(user, 200, req, res)
			: res.status(400).json({ message: 'login failed' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}

	// // check for user password
	// if (user && (await bcrypt.compare(password, user.password))) {
	// 	res.status(201).json({
	// 		_id: user.id,
	// 		name: user.name,
	// 		email: user.email,
	// 		username: user.username,
	// 		token: generateToken(user._id),
	// 	});
	// } else {
	// 	res.status(400);
	// 	throw new Error('Invalid login data');
	// }
});

//@desc  Get user data
//@route  GET /api/users/me
//@access Private
const getCurrentUser = asyncHandler(async (req, res) => {
	const { _id, name, email } = await User.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email,
		token,
	});
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

// const refreshToken = id => {
// 	return jwt.sign({id}, process.env.JWT_)
// }

module.exports = {
	registerUser,
	loginUser,
	getCurrentUser,
};
