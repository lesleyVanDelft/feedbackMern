const postTypeValidator = require('../utils/postTypeValidator');
const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');

const getFeedbacks = async (req, res) => {
	const allFeedbacks = await Feedback.find({});

	res.status(200).json(allFeedbacks);
};

const getFeedbackAndComments = async (req, res) => {
	const { id } = req.params;

	const feedback = await Feedback.findById(id);

	if (!feedback) {
		return res
			.status(404)
			.send({ message: `Feedback with ID:${id} does not exist` });
	}

	// const populatedFeedback = await feedback.populate('author', 'username');
	const populatedFeedback = await feedback.populate([
		{
			path: 'author',
			populate: 'username',
		},
		{
			path: 'comments',
			populate: [
				{
					path: 'comments.commentedBy',
					select: ['username'],
					// ,'commentBody'
				},
				{
					path: 'comments.replies',
					select: ['username'],
				},
			],
		},
	]);

	res.status(200).json(populatedFeedback);
};

const createNewFeedback = async (req, res) => {
	const { title, text, feedbackType } = req.body;

	// const author = await User.findById(req.user);
	// console.log(author);
	// if (!author) {
	// 	return res
	// 		.status(404)
	// 		.send({ message: 'User does not exist in database / feedback.js' });
	// }

	const newFeedback = await Feedback.create({
		title,
		text,
		feedbackType,
		// author: req.user.id,
		feedbackType: req.body.feedbackType,
		// upvotedBy: [author._id],
		pointsCoint: 0,
	});

	// const savedFeedback = await newFeedback.save();

	// author.feedbacksPosted = author.feedbacksPosted.concat(savedFeedback._id);
	// author.karmaPoints.postKarma++;
	// await author.save();

	// const populatedFeedback = await savedFeedback.populate('author', 'username');

	res.status(201).json(newFeedback);
};

const updateFeedback = async (req, res) => {
	const { id } = req.params;
	console.log(req.user);
	// const { title, feedbackType, text } = req.body;

	// const feedback = await Feedback.findById(id);
	// const author = await User.findById(req.user);

	// if (!feedback) {
	// 	return res.status(404).send({
	// 		message: `feedback with ID: ${id} does not exist in database.`,
	// 	});
	// }

	// if (!author) {
	// 	return res
	// 		.status(404)
	// 		.send({ message: 'User does not exist in database.' });
	// }

	// if (feedback.author.toString() !== author._id.toString()) {
	// 	return res.status(401).send({ message: 'Access is denied.' });
	// }

	// feedback.updatedAt = Date.now();

	// const savedFeedback = await feedback.save();
	// const populatedFeedback = await savedFeedback
	// 	.populate('author', 'username')
	// 	.populate('comments.commentedBy', 'username')
	// 	.populate('comments.replies.repliedBy', 'username')
	// 	.execPopulate();

	// res.status(202).json(populatedFeedback);
	const feedback = await Feedback.findById(id);
	// console.log(req.body);

	if (!feedback) {
		res.status(400);
		throw new Error('Feedback not found');
	}

	// if (!req.user) {
	// 	res.status(400);
	// 	throw new Error('User not found');
	// }

	// if (feedback.user.toString() !== req.user.id) {
	// 	res.status(401);
	// 	throw new Error('User not authorized(feedbackController)');
	// }

	const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	res.status(200).json(updatedFeedback);
};

const deleteFeedback = async (req, res) => {
	const { id } = req.params;

	// const feedback = await Feedback.findById(id);
	// const author = await User.findById(req.user);

	// if (!feedback) {
	// 	return res.status(404).send({
	// 		message: `feedback with ID: ${id} does not exist in database.`,
	// 	});
	// }

	// if (!author) {
	// 	return res
	// 		.status(404)
	// 		.send({ message: 'User does not exist in database.' });
	// }

	// if (feedback.author.toString() !== author._id.toString()) {
	// 	return res.status(401).send({ message: 'Access is denied.' });
	// }

	// // const subreddit = await Subreddit.findById(feedback.subreddit);

	// // if (!subreddit) {
	// //   return res.status(404).send({
	// // 	message: `Subreddit with ID: '${subreddit._id}'  does not exist in database.`,
	// //   });
	// // }

	// await Feedback.findByIdAndDelete(id);

	// // subreddit.posts = subreddit.posts.filter((p) => p.toString() !== id);
	// // await subreddit.save();

	// author.posts = author.posts.filter(p => p.toString() !== id);
	// await author.save();
	const feedback = await Feedback.findById(id);
	// console.log(feedback);

	if (!feedback) {
		res.status(400);
		throw new Error('Feedback not found');
	}

	// check for user
	// if (!req.user) {
	// 	res.status(401);
	// 	throw new Error('User not found');
	// }

	// make sure the logged in user matches the goal user
	// if (feedback.user.toString() !== req.user.id) {
	// 	res.status(401);
	// 	throw new Error('User not authorized');
	// }

	await Feedback.findByIdAndRemove(id);

	res.status(202);

	// res.status(204).end();
};

module.exports = {
	getFeedbacks,
	getFeedbackAndComments,
	createNewFeedback,
	updateFeedback,
	deleteFeedback,
};
