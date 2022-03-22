const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
	created: {
		type: Date,
		default: Date.now,
	},
	text: {
		type: String,
		trim: true,
		required: [true, 'Please enter a comment'],
	},
	feedback: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Feedback',
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

module.exports = mongoose.model('Comment', commentModel);
