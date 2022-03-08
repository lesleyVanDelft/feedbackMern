const mongoose = require('mongoose');

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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userModel);
