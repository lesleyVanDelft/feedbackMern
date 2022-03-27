const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');
const numOfComments = require('../utils/numOfComments');

const postComment = async (req, res) => {
	const { id } = req.params;
	const { comment } = req.body;

	if (!comment) {
		return res.status(400).send({ message: `Comment body can't be empty.` });
	}

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	feedback.comments = feedback.comments.concat({
		commentedBy: user._id,
		commentBody: comment,
		upvotedBy: [user._id],
		pointsCount: 1,
	});
	feedback.commentCount = numOfComments(feedback.comments);
	const savedFeedback = await feedback.save();
	const populatedFeedback = await savedFeedback
		.populate('comments.commentedBy', 'username')
		.execPopulate();

	user.karmaPoints.commentKarma++;
	user.totalComments++;
	await user.save();

	const addedComment =
		populatedFeedback.comments[savedPost.comments.length - 1];
	res.status(201).json(addedComment);
};

const deleteComment = async (req, res) => {
	const { id, commentId } = req.params;

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	const targetComment = feedback.comments.find(
		c => c._id.toString() === commentId
	);

	if (!targetComment) {
		return res.status(404).send({
			message: `Comment with ID: '${commentId}'  does not exist in database.`,
		});
	}

	if (targetComment.commentedBy.toString() !== user._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	feedback.comments = feedback.comments.filter(
		c => c._id.toString() !== commentId
	);
	feedback.commentCount = numOfComments(feedback.comments);

	await feedback.save();
	res.status(204).end();
};

const updateComment = async (req, res) => {
	const { id, commentId } = req.params;
	const { comment } = req.body;

	if (!comment) {
		return res.status(400).send({ message: `Comment body can't be empty.` });
	}

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	const targetComment = feedback.comments.find(
		c => c._id.toString() === commentId
	);

	if (!targetComment) {
		return res.status(404).send({
			message: `Comment with ID: '${commentId}'  does not exist in database.`,
		});
	}

	if (targetComment.commentedBy.toString() !== user._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	targetComment.commentBody = comment;
	targetComment.updatedAt = Date.now();

	feedback.comments = feedback.comments.map(c =>
		c._id.toString() !== commentId ? c : targetComment
	);

	await feedback.save();
	res.status(202).end();
};

const postReply = async (req, res) => {
	const { id, commentId } = req.params;
	const { reply } = req.body;

	if (!reply) {
		return res.status(400).send({ message: `Reply body can't be empty.` });
	}

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	const targetComment = feedback.comments.find(
		c => c._id.toString() === commentId
	);

	if (!targetComment) {
		return res.status(404).send({
			message: `Comment with ID: '${commentId}'  does not exist in database.`,
		});
	}

	targetComment.replies = targetComment.replies.concat({
		replyBody: reply,
		repliedBy: user._id,
		upvotedBy: [user._id],
		pointsCount: 1,
	});

	feedback.comments = feedback.comments.map(c =>
		c._id.toString() !== commentId ? c : targetComment
	);
	feedback.commentCount = numOfComments(feedback.comments);
	const savedFeedback = await feedback.save();
	const populatedFeedback = await savedFeedback
		.populate('comments.replies.repliedBy', 'username')
		.execPopulate();

	user.karmaPoints.commentKarma++;
	user.totalComments++;
	await user.save();

	const commentToReply = populatedFeedback.comments.find(
		c => c._id.toString() === commentId
	);

	const addedReply = commentToReply.replies[commentToReply.replies.length - 1];
	res.status(201).json(addedReply);
};

const deleteReply = async (req, res) => {
	const { id, commentId, replyId } = req.params;

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	const targetComment = feedback.comments.find(
		c => c._id.toString() === commentId
	);

	if (!targetComment) {
		return res.status(404).send({
			message: `Comment with ID: '${commentId}'  does not exist in database.`,
		});
	}

	const targetReply = targetComment.replies.find(
		r => r._id.toString() === replyId
	);

	if (!targetReply) {
		return res.status(404).send({
			message: `Reply comment with ID: '${replyId}'  does not exist in database.`,
		});
	}

	if (targetReply.repliedBy.toString() !== user._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	targetComment.replies = targetComment.replies.filter(
		r => r._id.toString() !== replyId
	);

	feedback.comments = feedback.comments.map(c =>
		c._id.toString() !== commentId ? c : targetComment
	);
	feedback.commentCount = numOfComments(feedback.comments);

	await feedback.save();
	res.status(204).end();
};

const updateReply = async (req, res) => {
	const { id, commentId, replyId } = req.params;
	const { reply } = req.body;

	if (!reply) {
		return res.status(400).send({ message: `Reply body can't be empty.` });
	}

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `feedback with ID: ${id} does not exist in database.`,
		});
	}

	if (!user) {
		return res
			.status(404)
			.send({ message: 'User does not exist in database.' });
	}

	const targetComment = feedback.comments.find(
		c => c._id.toString() === commentId
	);

	if (!targetComment) {
		return res.status(404).send({
			message: `Comment with ID: '${commentId}'  does not exist in database.`,
		});
	}

	const targetReply = targetComment.replies.find(
		r => r._id.toString() === replyId
	);

	if (!targetReply) {
		return res.status(404).send({
			message: `Reply comment with ID: '${replyId}'  does not exist in database.`,
		});
	}

	if (targetReply.repliedBy.toString() !== user._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	targetReply.replyBody = reply;
	targetReply.updatedAt = Date.now();

	targetComment.replies = targetComment.replies.map(r =>
		r._id.toString() !== replyId ? r : targetReply
	);

	feedback.comments = feedback.comments.map(c =>
		c._id.toString() !== commentId ? c : targetComment
	);

	await feedback.save();
	res.status(202).end();
};

module.exports = {
	postComment,
	deleteComment,
	updateComment,
	postReply,
	deleteReply,
	updateReply,
};
