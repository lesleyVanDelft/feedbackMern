const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator')
const schemaCleaner = require('../utils/schemaCleaner');
// const {}

const replySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			ref: 'User',
		},
		username: {
			type: String,
			ref: 'User',
		},
		repliedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		replyBody: {
			type: String,
			trim: true,
		},
		profileImg: {
			type: Object,
			ref: 'User',
		},

		// upvotedBy: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'User'
		// 	}
		// ],
		// downvotedBy: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: 'User',
		// 	}
		// ],
	},
	{ timestamps: true }
);

const commentSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			ref: 'User',
		},
		username: {
			type: String,
			ref: 'User',
		},
		commentedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		commentBody: {
			type: String,
			trim: true,
		},
		replies: [replySchema],
		profileImg: {
			type: Object,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const feedbackModel = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		details: {
			name: {
				type: String,
				required: true,
			},
			username: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
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
		upvotedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		downvotedBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		pointsCoint: {
			type: Number,
			default: 0,
			required: true,
		},
		comments: [commentSchema],
		commentCount: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			required: true,
			default: 'planned',
		},
	},
	{
		timestamps: true,
	}
);

// const feedbackModel = new mongoose.Schema(
// 	{
// 		user: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			// required: true,
// 			ref: 'User',
// 		},
// 		title: {
// 			type: String,
// 			required: [true, 'Please add a title'],
// 		},
// 		text: {
// 			type: String,
// 			required: [true, 'Please add a text value'],
// 		},
// 		feedbackType: {
// 			type: String,
// 			required: [true, 'Please select a feedbacktype'],
// 		},
// 		comments: {
// 			type: Array,
// 			default: [],
// 			// ref: 'Comment',
// 		},
// 		likes: {
// 			type: Array,
// 			default: [],
// 			// ref: 'Upvote',
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// feedbackModel.virtual('url').get(function(){
// 	return '/post/' +  this._id;
// })

// replaces _id with id, convert id to string from ObjectID and deletes __v
// schemaCleaner(feedbackModel);
// schemaCleaner(commentSchema);
// schemaCleaner(replySchema);

module.exports = mongoose.model('Feedback', feedbackModel);
