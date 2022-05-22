const postTypeValidator = require('../utils/postTypeValidator');
const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');

const getFeedbacks = async (req, res) => {
	const allFeedbacks = await Feedback.find({});
	// const user = await User.findById(req.user._id);
	if (req.user) {
		res.status(200).json(allFeedbacks);
	} else if (!req.user) {
		// res.status(401).send('Not allowed, no user found');
		res.redirect(401, '/login');
	}
};

const getSingleFeedback = async (req, res) => {
	// const singleFeedback = await Feedback.findById(req.params.id);
	// return res.status(200).json(singleFeedback);

	const { id } = req.params;
	const singleFeedback = await Feedback.findById(id);
	// console.log(req.user);

	if (!singleFeedback) {
		return res
			.status(404)
			.send({ message: `Feedback with ID:${id} does not exist` });
	}

	// const populatedFeedback = await feedback.populate('author', 'username');
	// const populatedFeedback = await feedback.populate([
	// 	{
	// 		path: 'author',
	// 		populate: 'username',
	// 	},
	// 	{
	// 		path: 'comments',
	// 		populate: [
	// 			{
	// 				path: 'comments.commentedBy',
	// 				select: ['username'],
	// 				// ,'commentBody'
	// 			},
	// 			{
	// 				path: 'comments.replies',
	// 				select: ['username'],
	// 			},
	// 		],
	// 	},
	// ]);

	return res.status(200).json(singleFeedback);
};

const getFeedbackAndComments = async (req, res) => {
	// const { id } = req.params;
	// const feedback = await Feedback.findById(id);
	// if (!feedback) {
	// 	return res
	// 		.status(404)
	// 		.send({ message: `Feedback with ID:${id} does not exist` });
	// }
	// // const populatedFeedback = await feedback.populate('author', 'username');
	// const populatedFeedback = await feedback.populate([
	// 	{
	// 		path: 'author',
	// 		populate: 'username',
	// 	},
	// 	{
	// 		path: 'comments',
	// 		populate: [
	// 			{
	// 				path: 'comments.commentedBy',
	// 				select: ['username'],
	// 				// ,'commentBody'
	// 			},
	// 			{
	// 				path: 'comments.replies',
	// 				select: ['username'],
	// 			},
	// 		],
	// 	},
	// ]);
	// return res.status(200).json(populatedFeedback);
};

const createNewFeedback = async (req, res) => {
	const { title, text, feedbackType, author, details } = req.body;

	const newFeedback = await Feedback.create({
		title,
		text,
		feedbackType,
		author,
		details,
		feedbackType: req.body.feedbackType,
		// upvotedBy: [author._id],
		pointsCoint: 0,
	});

	res.status(201).json(newFeedback);
};

const updateFeedback = async (req, res) => {
	const { id } = req.params;
	const feedback = await Feedback.findById(id);

	if (!feedback) {
		res.status(400);
		throw new Error('Feedback not found');
	}

	const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	return res.status(200).json(updatedFeedback);
};

const deleteFeedback = async (req, res) => {
	const { id } = req.params;
	const feedback = await Feedback.findById(id);

	if (!feedback) {
		res.status(400);
		throw new Error('Feedback not found');
	}
	await Feedback.findByIdAndRemove(id);

	return res.status(202);
};

module.exports = {
	getFeedbacks,
	getSingleFeedback,
	getFeedbackAndComments,
	createNewFeedback,
	updateFeedback,
	deleteFeedback,
};
