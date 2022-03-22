const mongoose = require('mongoose');

const feedbackModel = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			// required: true,
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
		feedbackType: {
			type: String,
			required: [true, 'Please select a feedbacktype'],
		},
		// comments: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'Comment',

		// 	},
		// ],
		comments: {
			type: Array,
			default: [],
		},
		likes: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

// feedbackModel.virtual('url').get(function(){
// 	return '/post/' +  this._id;
// })

module.exports = mongoose.model('Feedback', feedbackModel);
