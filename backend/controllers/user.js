const aws = require('aws-sdk');
const multer = require('multer');
const { uploadFile, getFileStream } = require('../s3');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
	accessKeyId,
	secretAccessKey,
	region,
});

const getUser = async (req, res) => {
	const { email } = req.params;

	const user = await User.findOne({
		email: email,
	});

	if (!user) {
		return res
			.status(404)
			.send({ message: `Username '${username}' does not exist on server.` });
	}

	res.status(200).json(user);
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

		console.log(decoded);
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

module.exports = { getUser, setUserAvatar, removeUserAvatar, setProfileImage };
