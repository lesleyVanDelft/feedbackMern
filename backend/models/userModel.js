const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
// const schemaCleaner = require('../utils/schemaCleaner');
// const bcryptjs = require('bcryptjs');

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
			validate: [isEmail, 'Please enter a valid email'],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: [6, 'Minimum password length is 6 characters'],
		},
		profileImg: {
			exists: {
				type: Boolean,
				default: false,
			},
			imageLink: {
				type: String,
				trim: true,
				default: '',
			},
			imageId: {
				type: String,
				trim: true,
				default: '',
			},
		},
		imageId: {
			type: String,
			trim: true,
			default: '',
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

// after creating a user
// userModel.post('save', function (doc, next) {
// 	console.log('new user was created', doc);
// 	next();
// });

// before instance of user
// userModel.pre('save', async function (next) {
// 	const salt = await bcryptjs.genSalt();
// 	this.password = await bcryptjs.hash(this.password, salt);
// 	next();
// });

// static method to login user
// userModel.statics.login = async function (email, password) {
// 	const user = await this.findOne({ email });
// 	if (user) {
// 		const auth = await bcryptjs.compare(password, user.password);
// 		if (auth) {
// 			return user;
// 		} else {
// 			throw Error('Incorrect password');
// 		}
// 	}
// 	throw Error('Incorrect email');
// };

// userModel.plugin(uniqueValidator);

// replaces _id with id, convert id to string from ObjectID and deletes __v
// schemaCleaner(userModel);

module.exports = mongoose.model('User', userModel);
