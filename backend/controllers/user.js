const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');

const getUser = async (req, res) => {
	const token = req.cookies.jwt;
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.id);

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
	// if (!user) {
	// 	return res
	// 		.status(404)
	// 		.send({ message: `Username '${username}' does not exist on server.` });
	// }
};

const setUserAvatar = async (req, res) => {
	const { avatarImage } = req.body;

	if (!avatarImage) {
		return res
			.status(400)
			.send({ message: 'Image URL needed for setting avatar.' });
	}

	const user = await User.findById(req.user);

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	const uploadedImage = await cloudinary.uploader.upload(
		avatarImage,
		{
			upload_preset: UPLOAD_PRESET,
		},
		error => {
			if (error) return res.status(401).send({ message: error.message });
		}
	);

	user.avatar = {
		exists: true,
		imageLink: uploadedImage.url,
		imageId: uploadedImage.public_id,
	};

	const savedUser = await user.save();
	res.status(201).json({ avatar: savedUser.avatar });
};

const removeUserAvatar = async (req, res) => {
	const user = await User.findById(req.user);

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	user.avatar = {
		exists: false,
		imageLink: 'null',
		imageId: 'null',
	};

	await user.save();
	res.status(204).end();
};

// const upload = bucketName => {
// 	multer({
// 		storage: multerS3({
// 			s3,
// 			bucket: bucketName,
// 			metadata: function (req, file, cb) {
// 				cb(null, { fieldName: file.fieldname });
// 			},
// 			key: function (req, file, cb) {
// 				cb(null, `image-${Date.now()}.jpeg`);
// 			},
// 		}),
// 	});
// };

const setProfileImage = async key => {
	return async (req, res, next) => {
		const token = req.cookies.jwt;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// console.log(decoded);
		const updatedUser = await User.findByIdAndUpdate(decoded.id, {
			profileImg: {
				exists: true,
				imageLink: key.toString(),
				imageId: '',
			},
		});

		res.status(204).json(updatedUser);
		next();
	};
};

const changePassword = async () => {
	return async (req, res, next) => {
		const token = req.cookies.jwt;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		const password = req.body.currentPassword;
		const newPassword = req.body.newPassword;

		const currentPasswordCheck = await bcryptjs.compare(
			user.password,
			password
		);

		if (currentPasswordCheck && newPassword) {
			try {
				const salt = await bcryptjs.genSalt();
				const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

				const updatedUser = await user.findByIdAndUpdate(decoded.id, {
					password: hashedNewPassword,
				});

				res.status(200).json(updatedUser);
			} catch (error) {
				console.log(error);
			}
		} else {
			if (currentPasswordCheck === false) {
				res.status(403).send('Wrong password entered');
			} else if (!newPassword) {
				res.status(403).send('Passwords do not match');
			}

			console.log('changePassword controller');
		}
		next();
	};
};

module.exports = {
	getUser,
	setUserAvatar,
	removeUserAvatar,
	setProfileImage,
	changePassword,
};
