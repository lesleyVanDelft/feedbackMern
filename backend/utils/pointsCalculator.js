const pointsCalculator = (upvotes, downvotes, createdDate) => {
	const result = {};
	const points = upvotes - downvotes;

	if (points <= 0) {
		result.pointsCount = 0;
	} else {
		result.pointsCount = points;
	}

	return result;
};

module.exports = pointsCalculator;
