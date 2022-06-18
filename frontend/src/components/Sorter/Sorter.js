import React, { useEffect } from 'react';
import moment from 'moment';
// import { useSelector } from 'react-redux';

const Sorter = ({ children, by, feedbackData }) => {
	// const feedbacks = useSelector(state => state.feedbacks);
	// console.log(feedbackData.upvotedBy.length);
	// let upvoteLength = feedbackData.upvotedBy.length;
	// let commentLength = feedbackData.commentCount;
	// const childrenArray = React.Children.toArray(children);
	// useEffect(() => {
	console.log(children);
	// }, [])

	// const getDate = (date) => {

	// }
	// createdAt(pin):"2022-04-16T14:47:11.361Z"
	const compare = (a, b) => {
		// console.log(a.props.feedback.upvotedBy.length);
		// console.log(b.props.feedback.upvotedBy.length);
		// console.log(a.props.index);
		// return a.props[by] - b.props[by];
		// let sort = [];
		if (by === 'Most Upvotes') {
			// console.log(a.props);
			// console.log('++++++++++');
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
		} else if (by === 'Newest') {
			// console.log(b.props.feedback.updatedAt);
			return b.props.feedback.updatedAt - a.props.feedback.updatedAt;
		}
		// } else if (by === 'Oldest') {
		// 	return a.props.feedback.updatedAt - b.props.feedback.updatedAt;
		// }
	};

	if (!by) {
		// console.log(children);
		return children;
	}
	return React.Children.toArray(children).sort(compare);
	// return React.Children.toArray(children)
	// 	.sort(compare)
	// 	.map((fb, i) => {
	// 		// console.log(fb);
	// 		return fb;
	// 	});
	// return React.Children.toArray(children.map((value, i) => ))
};

export default Sorter;
