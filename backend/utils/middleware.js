const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
	// try {
	// const token = req.header(Authorization);
	// 	// const token = req.headers.Authorization.split(' ')[1];
	// 	// if (!token) {
	// 	// 	return res.status(401).send({
	// 	// 		message: 'No auth token found. Auth denied/utils/middleware.js',
	// 	// 	});
	// 	// }
	// 	// const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	// 	// if (!decodedToken.id) {
	// 	// 	return res.status(401).send({
	// 	// 		message: 'Token verification failed, auth denied/utils/middleware.js',
	// 	// 	});
	// 	// }
	// 	// req.user = decodedToken.id;
	// 	// console.log(req.user);
	// } catch (error) {
	// 	res.status(500).send({ message: error.message });
	// }

	let token;
	try {
		if (
			// req.headers.Authorization &&
			// req.headers.Authorization.startsWith('Bearer')
			req.cookies.jwt
		)
			// get token from header
			// token = req.headers.authorization.split(' ')[1];
			token = req.cookies.jwt;
		// verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(decoded);
		// get user from the token
		req.user = await User.findById(decoded.id).select('-password');
		// console.log(req.user);
		next();
	} catch (error) {
		console.log(error);
		res.status(401);
		throw new Error('Not authorized, no token / authmiddleware');
	}

	// else if (!token) {
	// 	res.status(401);
	// 	throw new Error('Not authorized, no token / authmiddleware');
	// }
};

const unknownEndpointHandler = (_req, res) => {
	res.status(404).send({ message: 'Unknown endpoint' });
};

const errorHandler = (error, _req, res, next) => {
	// console.log(error.message + 'utils/middleware.js');
	// if (error.name === 'CastError' && error.kind === 'ObjectId') {
	// 	return res.status(400).send({ message: 'Malformatted ID.' });
	// } else if (error.name === 'ValidationError') {
	// 	return res.status(400).send({ message: error.message });
	// } else if (error.name === 'JsonWebTokenError') {
	// 	return res.status(401).send({ message: 'Invalid token.' });
	// } else {
	// 	res.status(400).send({ message: error.message });
	// }
	// if (error.response === 401) {
	// 	return res.status(401).send({ loginError: error.response });
	// }
	// next(error);
};

module.exports = { auth, unknownEndpointHandler, errorHandler };
