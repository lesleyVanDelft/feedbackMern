const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		// const token = req.header(Authorization);
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(401).send({
				message: 'No auth token found. Auth denied/utils/middleware.js',
			});
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		if (!decodedToken.id) {
			return res.status(401).send({
				message: 'Token verification failed, auth denied/utils/middleware.js',
			});
		}

		req.user = decodedToken.id;
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const unknownEndpointHandler = (_req, res) => {
	res.status(404).send({ message: 'Unknown endpoint' });
};

const errorHandler = (error, _req, res, next) => {
	console.log(error.message + 'utils/middleware.js');

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return res.status(400).send({ message: 'Malformatted ID.' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).send({ message: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(401).send({ message: 'Invalid token.' });
	} else {
		res.status(400).send({ message: error.message });
	}

	next(error);
};

module.exports = { auth, unknownEndpointHandler, errorHandler };
