const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const schemaCleaner = require('../utils/schemaCleaner');

const userModel = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		username: {
			type: String,
			required: [true, 'Please add a username'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Please add an email address'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
		profileImg: {
			exists: {
				type: Boolean,
				default: false,
			},
			imageLink: {
				type: String,
				trim: true,
				default: 'null',
			},
			imageId: {
				type: String,
				trim: true,
				default: 'null',
			},
		},
		feedbacksPosted: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Feedback',
			},
		],
		karmaPoints: {
			postKarma: {
				type: Number,
				default: 0,
			},
			commentKarma: {
				type: Number,
				default: 0,
			},
		},
	},
	{ timestamps: true }
);
// const userModel = mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: [true, 'Please add a name'],
// 		},
// 		username: {
// 			type: String,
// 			required: [true, 'Please add a username'],
// 			unique: true,
// 		},
// 		email: {
// 			type: String,
// 			required: [true, 'Please add an email address'],
// 			unique: true,
// 		},
// 		password: {
// 			type: String,
// 			required: [true, 'Please add a password'],
// 		},
// 	},
// 	{ timestamps: true }
// );

userModel.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
schemaCleaner(userModel);

module.exports = mongoose.model('User', userModel);
