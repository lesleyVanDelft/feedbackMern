const User = require('../models/userModel');
const Feedback = require('../models/feedbackModel');
// const { cloudinary, UPLOAD_PRESET } = require('../utils/config');
// const paginateResults = require('../utils/paginateResults');

const getUser = async (req, res) => {
	const { email } = req.params;
	// const page = Number(req.query.page);
	// const limit = Number(req.query.limit);

	const user = await User.findOne({
		email: email,
	});

	if (!user) {
		return res
			.status(404)
			.send({ message: `Username '${username}' does not exist on server.` });
	}

	// const postsCount = await Post.find({ author: user.id }).countDocuments();
	// const paginated = paginateResults(page, limit, postsCount);
	// const userPosts = await Post.find({ author: user.id })
	// 	.sort({ createdAt: -1 })
	// 	.select('-comments')
	// 	.limit(limit)
	// 	.skip(paginated.startIndex)
	// 	.populate('author', 'username')
	// 	.populate('subreddit', 'subredditName');

	// const paginatedPosts = {
	// 	previous: paginated.results.previous,
	// 	results: userPosts,
	// 	next: paginated.results.next,
	// };

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

module.exports = { getUser, setUserAvatar, removeUserAvatar };
