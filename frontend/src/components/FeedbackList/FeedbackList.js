import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getFeedbacks,
	toggleUpvote,
	toggleDownvote,
} from '../../reducers/feedbackReducer';
import FeedbackItem from '../FeedbackItem/FeedbackItem';

import './FeedbackList.css';

const FeedbackList = () => {
	const [pageLoading, setPageLoading] = useState(false);
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const handleLoadFeedbacks = async () => {
		try {
			setPageLoading(true);
			await dispatch(getFeedbacks());
			setPageLoading(false);
		} catch (error) {
			setPageLoading(false);
			console.log(error);
		}
	};

	return (
		<section className="FeedbackList">
			{feedbacks && feedbacks.results && !pageLoading
				? feedbacks.results.map(feedback => (
						<FeedbackItem
							feedback={feedback}
							key={feedback.id}
							toggleUpvote={toggleUpvote}
							toggleDownvote={toggleDownvote}
						/>
				  ))
				: 'loading'}
		</section>
	);
};

export default FeedbackList;
