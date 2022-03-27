const Feedback = require('../models/feedbackModel');
const User = require('../models/userModel');
const pointsCalculator = require('../utils/pointsCalculator');

const upvoteFeedback = async (req, res) => {
	const { id } = req.params;

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `Post with ID: ${id} does not exist in database./feedbackvote controller`,
		});
	}

	if (!user) {
		return res.status(404).send({ message: 'User does not exist in database' });
	}

	const author = await User.findById(feedback.author);

	if (!author) {
		return res
			.status(404)
			.send({ message: 'Author does not exist in database' });
	}

	if (feedback.upvotedBy.includes(user._id.toString())) {
		feedback.upvotedBy = feedback.upvotedBy.filter(
			u => u.toString() !== user._id.toString()
		);

		author.karmaPoints.feedbackKarma--;
	} else {
		feedback.upvotedBy = feedback.upvotedBy.concat(user._id);
		feedback.downvotedBy = feedback.downvotedBy.filter(
			d => d.toString() !== user._id.toString()
		);

		author.karmaPoints.postKarma++;
	}

	// if (feedback.upvotedBy.includes(user._id.toString())) {
	// 	feedback.upvotedBy = feedback.upvotedBy.filter(u => {
	// 		u.toString() !== user._id.toString();
	// 	})

	//     author
	// }

	// add to pointscount model
	const calculatedData = pointsCalculator(
		feedback.upvotedBy.length,
		feedback.downvotedBy.length,
		feedback.createdAt
	);

	feedback.pointsCount = calculatedData.pointsCount;

	await feedback.save();
	await author.save();

	res.status(201).end();
};

const downvoteFeedback = async (req, res) => {
	const { id } = req.params;

	const feedback = await Feedback.findById(id);
	const user = await User.findById(req.user);

	if (!feedback) {
		return res.status(404).send({
			message: `Post with ID: ${id} does not exist in database./feedbackvote controller`,
		});
	}

	if (!user) {
		return res.status(404).send({ message: 'User does not exist in database' });
	}

	const author = await User.findById(feedback.author);

	if (!author) {
		return res
			.status(404)
			.send({ message: 'Author does not exist in database' });
	}

	if (feedback.downvotedBy.includes(user._id.toString())) {
		feedback.downvotedBy = feedback.downvotedBy.filter(
			d => d.toString() !== user._id.toString()
		);

		author.karmaPoints.feedbackKarma++;
	} else {
		feedback.downvotedBy = feedback.downvotedBy.concat(user._id);
		feedback.upvotedBy = feedback.upvotedBy.filter(
			u => u.toString() !== user._id.toString()
		);

		author.karmaPoints.postKarma--;
	}

	// add to pointscount model
	const calculatedData = pointsCalculator(
		feedback.upvotedBy.length,
		feedback.downvotedBy.length,
		feedback.createdAt
	);

	feedback.pointsCount = calculatedData.pointsCount;

	await feedback.save();
	await author.save();

	res.status(201).end();
};

module.exports = { upvoteFeedback, downvoteFeedback };
