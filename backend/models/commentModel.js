const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
	text: {
		type: String,
		trim: true,
		required: [true, 'Please enter a comment'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
	feedback: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Feedback',
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = mongoose.model('Comment', commentModel);
