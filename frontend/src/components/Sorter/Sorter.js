import React from 'react';
// import { useSelector } from 'react-redux';

const Sorter = ({ children, by, feedbackData }) => {
	// const feedbacks = useSelector(state => state.feedbacks);
	// console.log(feedbackData.upvotedBy.length);
	// let upvoteLength = feedbackData.upvotedBy.length;
	// let commentLength = feedbackData.commentCount;
	// const childrenArray = React.Children.toArray(children);

	const compare = (a, b) => {
		// console.log(a.props.feedback.upvotedBy.length);
		// console.log(b.props.feedback.upvotedBy.length);
		// return a.props[by] - b.props[by];
		if (by === 'Most Upvotes') {
			return (
				b.props.feedback.upvotedBy.length - a.props.feedback.upvotedBy.length
			);
		} else if (by === 'Least Upvotes') {
			return (
				a.props.feedback.upvotedBy.length - b.props.feedback.upvotedBy.length
			);
		} else if (by === 'Most Comments') {
			return b.props.feedback.commentCount - a.props.feedback.commentCount;
		} else if (by === 'Least Comments') {
			return a.props.feedback.commentCount - b.props.feedback.commentCount;
		}
	};

	if (!by) {
		// console.log(children);
		return children;
	}
	// return React.Children.toArray(children).sort(compare);
	return React.Children.toArray(children).sort(compare);
};

export default Sorter;
