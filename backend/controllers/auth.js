const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// const user = await User.findOne({
	//     email: {$regex: new RegExp('^' + email + '$' + 'i')}
	// })
	const user = await User.findOne({ email });

	if (!user) {
		return res.status(400).send({
			message:
				'No account with this email has been registered. / controller auth.js',
		});
	}

	const credentialsValid = await bcrypt.compare(password, user.password);

	if (!credentialsValid) {
		return res.status(401).send({ message: 'Invalid login info' });
	}

	const payloadForToken = {
		id: user._id,
	};

	const token = jwt.sign(payloadForToken, process.env.JWT_SECRET);

	res.status(200).json({
		token,
		name: user.name,
		username: user.username,
		id: user._id,
		profileImg: user.profileImg,
	});
};

const registerUser = async (req, res) => {
	const { name, email, password, username } = req.body;

	if (!name || !email || !password || !username) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	//Check if user exists
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		return res.status(400).send({
			message: `Email is already registered to a user.`,
		});
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

	const savedUser = await user.save();

	const payloadForToken = {
		id: savedUser._id,
	};

	const token = jwt.sign(payloadForToken, process.env.JWT_SECRET);

	res.status(200).json({
		token,
		email: savedUser.email,
		username: savedUser.username,
		id: savedUser._id,
		profileImg: savedUser.profileImg,
	});
};

/**name
username
email
profileImg
feedbacksPosted */

module.exports = { loginUser, registerUser };
