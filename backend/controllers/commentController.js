const asyncHandler = require('express-async-handler');
const Feedback = require('../models/feedbackModel');
const Comment = require('../models/commentModel');

module.exports = {
	addComment,
};
// export const addComment = async (req, res) => {
// 	const { id } = req.params;
// 	const { value } = req.body;

// 	const feedback = await Feedback.findById(id);

// 	feedback.comments.push(value);

// 	const updatedFeedback = await Feedback.findByIdAndUpdate(id, feedback, {
// 		new: true,
// 	});

// 	res.status(200).json(updatedFeedback);
// };
