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
import Sorter from '../Sorter/Sorter';
import SuggestionsHeader from '../Suggestions/SuggestionsHeader/SuggestionsHeader';

const FeedbackList = ({ category }) => {
	const [sortBy, setSortBy] = useState('Most Upvotes');
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	// console.log(sortBy);
	useEffect(() => {
		dispatch(getFeedbacks());
	}, []);
	if (!feedbacks) {
		return <h1>Loading</h1>;
	}

	const filteredFeedbacks =
		feedbacks.length > 0 &&
		feedbacks.filter(feedback => {
			return feedback.feedbackType.toString().toLowerCase() === category;
		});
	// const filteredFeedbacks = [];

	const getSortBy = sortState => {
		setSortBy(sortState);
	};

	return (
		<motion.section className="FeedbackList">
			{/* <Suggestions suggestionCount={feedbacks && feedbacks.length} /> */}
			<SuggestionsHeader
				suggestionCount={feedbacks && feedbacks.length}
				sortBy={getSortBy}
				roadmap={false}
			/>

			{feedbacks && category === 'all' ? (
				<motion.div className="feedbacks">
					<Sorter by={sortBy}>
						{feedbacks.map((feedback, i) => (
							<FeedbackItem
								feedback={feedback}
								key={feedback._id}
								index={i}
								toggleUpvote={toggleUpvote}
								toggleDownvote={toggleDownvote}
							/>
						))}
					</Sorter>
				</motion.div>
			) : (
				<div className="feedbacks">
					<Sorter by={sortBy}>
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
					</Sorter>
				</div>
			)}
			{/* {filteredFeedbacks.length <= 0 ? <EmptyFeedback /> : null} */}
		</motion.section>
	);
};

export default FeedbackList;
