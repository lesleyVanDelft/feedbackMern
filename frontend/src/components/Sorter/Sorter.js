import React, { useEffect, useState } from 'react';
import moment from 'moment';
// import { useSelector } from 'react-redux';

const Sorter = ({ children, by }) => {
	const compare = (a, b) => {
		if (by === 'Most Upvotes') {
			// console.log(children);
			return (
				b.props.feedback.upvotedBy.length - a.props.feedback.upvotedBy.length
			);
			// });
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

	// if (!by) {
	// 	return children;
	// }

	// return React.Children.toArray(children).sort(compare);
	return children.sort(compare);
};

export default Sorter;
