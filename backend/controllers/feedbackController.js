const asyncHandler = require('express-async-handler');
const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');

//@desc  get Feedbacks
//@route  GET /api/Feedbacks
//@access Private
const getFeedbacks = asyncHandler(async (req, res) => {
	// const feedbacks = await Feedback.find({ user: req.user.id });
	const feedbacks = await Feedback.find({});
	// console.log(res);
	res.status(200).json(feedbacks);
});

//@desc   get single feedback
//@route  GET /api/feedbacks
//@access Private

// const getFeedbackDetails = asyncHandler(async (req, res) => {
// 	const feedback = await Feedback.find({ _id: req.params.id });
// 	console.log(req.params.id);
// 	res.status(200).json(feedback);
// });
const getSingleFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.find({ _id: req.params.id });

	res.status(200).json(feedback);
	console.log(feedback);
});

//@desc   update feedbacks
//@route  POST /api/feedbacks
//@access Private
const setFeedback = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}

	const feedback = await Feedback.create({
		title: req.body.title,
		text: req.body.text,
		user: req.user.id,
		feedbackType: req.body.feedbackType,
	});

	res.status(200).json(feedback);
});

//@desc   edit feedbacks
//@route  PUT /api/feedbacks/:id
//@access Private
const editFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.findById(req.params.id);

	if (!feedback) {
		res.status(400);
		throw new Error('Feedback not found');
	}

	// check for user
	if (!req.user) {
		res.status(401);
		throw new Error('User not found');
	}

	// make sure the logged in user matches the feedback user
	if (feedback.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedFeedback = await Feedback.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json(updatedFeedback);
});

//@desc  delete goals
//@route  DELETE /api/goals/:id
//@access Private
const deleteFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.findById(req.params.id);

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

	await feedback.remove();

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getFeedbacks,
	setFeedback,
	editFeedback,
	deleteFeedback,
	getSingleFeedback,
};
