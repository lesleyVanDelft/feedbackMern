const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');

// Error handler
const handleError = err => {
	let errors = { name: '', username: '', password: '', email: '' };

	// incorrect email
	if (err.message === 'Incorrect email') {
		errors.email = 'That email is not registered';
	}
	// incorrect password
	if (err.message === 'Incorrect password') {
		errors.password = 'That password is not registered';
	}

	// duplicate error code
	if (err.code === 11000) {
		errors.email = 'That email is already registered';
		return errors;
	}

	// validation errors
	if (err.message.includes('user validation failed')) {
		console.log(Object.values(err.errors)).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}
	console.log(err);
	return errors;
};

// Generate JWT
const maxAge = 30 * 24 * 60 * 60;
const generateToken = user => {
	return jwt.sign(
		{ id: user._id, username: user.username, name: user.name },
		process.env.JWT_SECRET,
		{
			expiresIn: maxAge,
		}
	);
};

// register
// const registerUser_get = (req, res) => {
// 	res.render('register');
// };
const registerUser = async (req, res) => {
	// const { name, username, email, password } = req.body;
	const { name, username, email } = req.body;

	const existingUser = await User.findOne({
		email,
	});

	if (existingUser) {
		return res
			.status(400)
			.send({ message: `Email: ${email} is already registered` });
	}

	try {
		const salt = await bcryptjs.genSalt();
		const hashedPassword = await bcryptjs.hash(req.body.password, salt);
		// Create user
		const user = await User.create({
			name,
			username,
			email,
			// username,
			password: hashedPassword,
		});

		const token = generateToken(user);
		res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
		return res.status(201).json({
			name: user.name,
			email: user.email,
			username: user.username,
			id: user._id,
			profileImg: user.profileImg,
			token,
		});
	} catch (err) {
		const errors = handleError(err);
		return res.status(500).json({ errors });
	}
};

// login
// const loginUser_get = (req, res) => {
// 	res.render('login');
// };
const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	// console.log(req.user);

	// if (!req.user) {
	// 	// res.status(401).send('login controller');
	// 	res.redirect(401, '/login');
	// }
	if (!req.body) {
		res.status(402).send('no req body');
	}

	if (!user) {
		console.error('wrong email - auth controller');
		res.status(400).send('Email is not registered');
	}

	if (user) {
		const comparedPassword = await bcryptjs.compare(password, user.password);
		if (comparedPassword) {
			const token = generateToken(user);
			res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });

			return res.status(200).json({
				name: user.name,
				email: user.email,
				username: user.username,
				id: user._id,
				profileImg: user.profileImg,
				token,
			});
		} else {
			console.error('wrong password - auth controller');
			// res.status(401);
			res.status(401).send('Wrong password');
		}
		console.log(req.user);
	}
};

const logoutUser = async (req, res) => {
	return res.cookie('jwt', '', { maxAge: 1 });
	// res.redirect('/');
};

module.exports = {
	loginUser,
	// loginUser_get,
	registerUser,
	// registerUser_get,
	logoutUser,
};

// login
// const user = await User.findOne({ email });
// if (!user) {
// 	return res.status(400).send({
// 		message:
// 			'No account with this email has been registered. / controller auth.js',
// 	});
// }

// const credentialsValid = await bcrypt.compare(password, user.password);

// if (!credentialsValid) {
// 	return res.status(401).send({ message: 'Invalid login info' });
// }

// const payloadForToken = {
// 	id: user._id,
// };

// const token = jwt.sign(payloadForToken, process.env.JWT_SECRET);
// // res.cookie('jwt', token)

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
