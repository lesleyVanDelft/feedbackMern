const postTypeValidator = require('../utils/postTypeValidator');
const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');

const getFeedbacks = async (req, res) => {
	const allFeedbacks = await Feedback.find({}).populate('author', 'username');
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

	const populatedFeedback = await feedback
		.populate('author', 'username')
		.populate('comments.commentedBy', 'username')
		.populate('comments.replies', 'username')
		.execPopulate();

	res.status(200).json(populatedFeedback);
};

const createNewFeedback = async (req, res) => {
	const { title, text, feedbackType } = req.body;

	const author = await User.findById(req.user);

	if (!author) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database / feedback.js' });
	}

	const newFeedback = await Feedback({
		title,
		text,
		feedbackType,
		author: author._id,
		feedbackType: req.body.feedbackType,
		upvotedBy: [author._id],
		pointsCoint: 1,
	});

	const savedFeedback = await newFeedback.save();

	author.feedbacksPosted = author.feedbacksPosted.concat(savedFeedback._id);
	author.karmaPoints.postKarma++;
	await author.save();

	const populatedFeedback = await savedFeedback
		.populate('author', 'username')
		.execPopulate();

	res.status(201).json(populatedFeedback);
};

const updateFeedback = async (req, res) => {
	const { id } = req.params;

	const { textSubmission } = req.body;

	const feedback = await Feedback.findById(id);
	const author = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!author) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	if (feedback.author.toString() !== author._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	feedback.updatedAt = Date.now();

	const savedFeedback = await feedback.save();
	const populatedFeedback = await savedFeedback
		.populate('author', 'username')
		.populate('comments.commentedBy', 'username')
		.populate('comments.replies.repliedBy', 'username')
		.execPopulate();

	res.status(202).json(populatedFeedback);
};

const deleteFeedback = async (req, res) => {
	const { id } = req.params;

	const feedback = await Feedback.findById(id);
	const author = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!author) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	if (feedback.author.toString() !== author._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	// const subreddit = await Subreddit.findById(feedback.subreddit);

	// if (!subreddit) {
	//   return res.status(404).send({
	// 	message: `Subreddit with ID: '${subreddit._id}'  does not exist in database.`,
	//   });
	// }

	await Feedback.findByIdAndDelete(id);

	// subreddit.posts = subreddit.posts.filter((p) => p.toString() !== id);
	// await subreddit.save();

	author.posts = author.posts.filter(p => p.toString() !== id);
	await author.save();

	res.status(204).end();
};

module.exports = {
	getFeedbacks,
	getFeedbackAndComments,
	createNewFeedback,
	updateFeedback,
	deleteFeedback,
};
