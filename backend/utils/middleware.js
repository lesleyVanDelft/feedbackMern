const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
	let token;
	try {
		if (req.cookies.jwt) {
			token = req.cookies.jwt;
			// verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// get user from the token
			req.user = await User.findById(decoded.id).select('-password');
		}
		next();
	} catch (error) {
		console.log(error);
		res
			.status(401)
			.send({ authErrorMsg: 'Not authorized, no token. - utils auth' });
		// throw new Error('Not authorized, no token / authmiddleware');
		// next();
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

const pushStateRouting = () => (req, res, next) => {
	if (req.method === 'GET' && !req.url.startsWith('/api')) {
		return res.sendFile(path.join(__dirname, '../frontend/build'));
	}
	next();
};

module.exports = {
	auth,
	unknownEndpointHandler,
	errorHandler,
	pushStateRouting,
};
