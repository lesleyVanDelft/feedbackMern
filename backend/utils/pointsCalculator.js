const pointsCalculator = (upvotes, downvotes, createdDate) => {
	const result = 0;
	const points = upvotes - downvotes;

	result.pointsCount = points;

	return result;
};

module.exports = pointsCalculator;
