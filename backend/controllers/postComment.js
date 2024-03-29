const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');
const numOfComments = require('../utils/numOfComments');
const jwt = require('jsonwebtoken');

const postComment = async (req, res) => {
	const { id } = req.params;
	const { commentData } = req.body;
	const token = req.cookies.jwt;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	if (!commentData) {
		return res.status(400).send({ message: `Comment body can't be empty.` });
	}

	// current feedback id comes with comment post object
	const feedback = await Feedback.findById(commentData._id);
	const user = await User.findById(decoded.id);
	// console.log(user);

	// feedback.author = user comes from auth middleware
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
		name: user.name,
		username: user.username,
		commentedBy: user.id,
		commentBody: commentData.comment,
		profileImg: {
			exists: user.profileImg.exists,
			imageLink: '',
			imageId: commentData.profileImg.imageId,
		},
		// profileImg: user.profileImg,
		imageId: user.imageId,
	});
	feedback.commentCount = numOfComments(feedback.comments);

	const savedFeedback = await feedback.save();

	const addedComment = feedback.comments[savedFeedback.comments.length - 1];

	res.status(201).json(addedComment).end();
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
	const token = req.cookies.jwt;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	if (!comment) {
		return res.status(400).send({ message: `Comment body can't be empty.` });
	}

	const feedback = await Feedback.findById(id);
	const user = await User.findById(decoded.id);

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
		comment => comment._id.toString() === commentId
	);
	// console.log(req.body.comment.editValue);

	if (!targetComment) {
		return res.status(404).send({
			message: `Comment with ID: '${commentId}' does not exist in database.`,
		});
	}

	if (targetComment.commentedBy.toString() !== user._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	targetComment.commentBody = comment.editValue;

	feedback.comments = feedback.comments.map(comment =>
		comment._id.toString() !== commentId ? comment : targetComment
	);

	await feedback.save();
	res.status(202).send('hi');
};

const postReply = async (req, res) => {
	const { id, commentId } = req.params;
	const { replyData } = req.body;

	const token = req.cookies.jwt;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	if (!replyData) {
		return res.status(400).send({ message: `Reply body can't be empty.` });
	}

	const feedback = await Feedback.findById(id);
	const user = await User.findById(decoded.id);

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
		name: user.name,
		username: user.username,
		repliedBy: user.id,
		replyBody: replyData.replyBody,
		profileImg: user.profileImg,
	});

	feedback.comments = feedback.comments.map(c =>
		c._id.toString() !== commentId ? c : targetComment
	);
	feedback.commentCount = numOfComments(feedback.comments);

	await feedback.save();

	const commentToReply = feedback.comments.find(
		c => c._id.toString() === commentId
	);

	const addedReply = commentToReply.replies[commentToReply.replies.length - 1];
	res.status(201).json(addedReply);
};

const deleteReply = async (req, res) => {
	const { id, commentId, replyId } = req.params;
	const token = req.cookies.jwt;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	const feedback = await Feedback.findById(id);
	const user = await User.findById(decoded.id);

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
	res.status(204).send('deleted');
};

const updateReply = async (req, res) => {
	const { id, commentId, replyId } = req.params;
	const { reply } = req.body;
	const token = req.cookies.jwt;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	if (!reply) {
		return res.status(400).send({ message: `Reply body can't be empty.` });
	}

	const feedback = await Feedback.findById(id);
	const user = await User.findById(decoded.id);

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
		comment => comment._id.toString() === commentId
	);

	if (!targetComment) {
		return res.status(404).send({
			message: `Comment with ID: '${commentId}'  does not exist in database.`,
		});
	}

	const targetReply = targetComment.replies.find(
		reply => reply._id.toString() === replyId
	);

	if (!targetReply) {
		return res.status(404).send({
			message: `Reply comment with ID: '${replyId}'  does not exist in database.`,
		});
	}

	if (targetReply.repliedBy.toString() !== user._id.toString()) {
		return res.status(401).send({ message: 'Access is denied.' });
	}

	targetReply.replyBody = reply.editValue;

	targetComment.replies = targetComment.replies.map(reply =>
		reply._id.toString() !== replyId ? reply : targetReply
	);

	feedback.comments = feedback.comments.map(comment =>
		comment._id.toString() !== commentId ? comment : targetComment
	);

	await feedback.save();
	res.status(202).send('reply updated');
};

module.exports = {
	postComment,
	deleteComment,
	updateComment,
	postReply,
	deleteReply,
	updateReply,
};
