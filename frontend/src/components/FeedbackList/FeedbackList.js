import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getFeedbacks,
	toggleUpvote,
	toggleDownvote,
} from '../../reducers/feedbackReducer';
import { motion } from 'framer-motion';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import EmptyFeedback from '../../components/EmptyFeedback/EmptyFeedback';

import './FeedbackList.css';
import Suggestions from '../Suggestions/Suggestions';

const FeedbackList = ({ category }) => {
	const [pageLoading, setPageLoading] = useState(false);
	const [feedbackData, setFeedbackData] = useState([]);
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	// const handleLoadFeedbacks = async () => {
	// 	try {
	// 		setPageLoading(true);
	// 		await dispatch(getFeedbacks());
	// 		setPageLoading(false);
	// 	} catch (error) {
	// 		setPageLoading(false);
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => {
	// 	if (feedbacks !== null) {
	// 		setFeedbackData(feedbacks);
	// 	}
	// }, [feedbacks]);

	if (!feedbacks) {
		return <h1>Loading</h1>;
	}

	const filteredFeedbacks = feedbacks.filter(feedback => {
		return feedback.feedbackType.toString().toLowerCase() === category;
	});
	// console.log(category);
	// const filteredFeedbacks = [];
	// console.log(filteredFeedbacks);

	return (
		<motion.section className="FeedbackList">
			<Suggestions suggestionCount={feedbacks && feedbacks.length} />
			{feedbacks && category === 'all' ? (
				<motion.div className="feedbacks">
					{feedbacks.map((feedback, i) => (
						<FeedbackItem
							feedback={feedback}
							key={feedback._id}
							index={i}
							toggleUpvote={toggleUpvote}
							toggleDownvote={toggleDownvote}
						/>
					))}
				</motion.div>
			) : (
				<div className="feedbacks">
					{filteredFeedbacks.length > 0 && category !== 'all' ? (
						filteredFeedbacks.map((feedback, i) => {
							return (
								<FeedbackItem
									feedback={feedback}
									key={feedback._id}
									index={i}
									toggleUpvote={toggleUpvote}
									toggleDownvote={toggleDownvote}
								/>
							);
						})
					) : (
						<EmptyFeedback />
					)}
				</div>
			)}
			{/* {filteredFeedbacks.length <= 0 ? <EmptyFeedback /> : null} */}
		</motion.section>
	);
};

export default FeedbackList;
