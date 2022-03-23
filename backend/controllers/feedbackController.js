const asyncHandler = require('express-async-handler');
const Feedback = require('../models/feedbackModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

//@desc  get Feedbacks
//@route  GET /api/Feedbacks
//@access Private
const getFeedbacks = asyncHandler(async (req, res) => {
	// const feedbacks = await Feedback.find({ user: req.user.id });
	const feedbacks = await Feedback.find({});

	res.status(200).json(feedbacks);
});

//@desc   get single feedback
//@route  GET /api/feedbacks
//@access Private
const getSingleFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.find({ _id: req.params.id });
	res.status(200).json(feedback);
});

//@desc   create feedbacks
//@route  POST /api/feedbacks
//@access Private
const setFeedback = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	// console.log(req.body);

	const newFeedback = await Feedback.create({
		title: req.body.title,
		text: req.body.text,
		user: req.user.id,
		feedbackType: req.body.feedbackType,
	});

	res.status(201).json(newFeedback);
});

//@desc   edit feedbacks
//@route  PUT /api/feedbacks/:id
//@access Private
const editFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.findById(req.params.id);
	// console.log(req.body);

	if (!feedback) {
		res.status(400);
		throw new Error('Feedback not found');
	}

	if (!req.user) {
		res.status(400);
		throw new Error('User not found');
	}

	if (feedback.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized(feedbackController)');
	}

	const updatedFeedback = await Feedback.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	// console.log(updatedFeedback);
	res.status(200).json(updatedFeedback);
});

//@desc  delete goals
//@route  DELETE /api/goals/:id
//@access Private
const deleteFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.findById(req.params.id);
	// console.log(feedback);

	if (!feedback) {
		res.status(400);
		throw new Error('Feedback not found');
	}

	// check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// make sure the logged in user matches the goal user
	if (feedback.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await Feedback.findByIdAndRemove(req.params.id);

	res.status(202);
});

//@desc  add to Comments
//@route  GET /api/Feedbacks
//@access Private
const addComment = asyncHandler(async (req, res) => {
	const feedback = await Feedback.findById({ _id: req.params.id });

	if (!feedback) {
		res.status(400);
		throw new Error('feedback notfound');
	}

	if (!req.user) {
		res.status(400);
		throw new Error('usernotfound');
	}
	if (feedback.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized broheim -- feedback controller');
	}

	const newComment = await Feedback.findByIdAndUpdate(
		req.params.id,
		{ $push: { comments: req.body.text } }
		// { new: true, upsert: true }
	);
	// const newComment = await Feedback.findByIdAndUpdate(
	// 	req.params.id,
	// 	{ $push: { comments: req.body.text } }
	// 	// { new: true, upsert: true }
	// );

	// console.log(req.params.id);
	// console.log(req.body);
	// console.log(newComment);
	// console.log(res);

	res.status(201).json(newComment);
});

module.exports = {
	getFeedbacks,
	setFeedback,
	editFeedback,
	deleteFeedback,
	getSingleFeedback,
	addComment,
};
