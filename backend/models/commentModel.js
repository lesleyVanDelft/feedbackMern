const mongoose = require('mongoose');

const commentModel = mongoose.Schema({
	text: {
		type: String,
		trim: true,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	feedback: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Feedback',
	},
});

module.exports = mongoose.model('Comment', commentModel);
