const mongoose = require('mongoose');

const feedbackModel = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		title: {
			type: String,
			required: [true, 'Please add a title'],
		},
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Feedback', feedbackModel);
