import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleUpvote, toggleDownvote } from '../../reducers/feedbackReducer';
import { motion } from 'framer-motion';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import EmptyFeedback from '../../components/EmptyFeedback/EmptyFeedback';
import Sorter from '../Sorter/Sorter';
import SuggestionsHeader from '../Suggestions/SuggestionsHeader/SuggestionsHeader';
import './FeedbackList.css';

const FeedbackList = ({ category }) => {
	const [sortBy, setSortBy] = useState('Most Upvotes');
	const feedbackList = useSelector(state => state.feedbacks);

	if (!feedbackList) {
		return <h1>Loading</h1>;
	}

	// Filter feedbacks on selected category
	const filteredFeedbacks =
		feedbackList.length > 0
			? feedbackList.filter(feedback => {
					return feedback.feedbackType.toString().toLowerCase() === category;
			  })
			: [];

	const getSortBy = sortState => {
		setSortBy(sortState);
	};

	const framerContainer = {
		initial: {
			opacity: 0,
			// translateX: -40,
		},
		animate: {
			opacity: 1,
			// translateX: 0,
		},
		transition: {
			// duration: 0.3,
		},
	};

	const framerItem = {
		initial: {
			opacity: 0,
			translateX: -40,
		},
		animate: {
			opacity: 1,
			translateX: 0,
		},
		transition: {
			duration: 0.3,
		},
	};

	return (
		<motion.section className="FeedbackList">
			{/* Contains Sort By and total feedback count */}
			<SuggestionsHeader
				suggestionCount={feedbackList && feedbackList.length}
				sortBy={getSortBy}
				roadmap={false}
			/>

			{/* If everything is empty */}
			{feedbackList.length <= 0 && category === 'all' ? (
				<div className="feedbacks">
					<EmptyFeedback userDetails={false} />
				</div>
			) : null}

			{/* Loop if feedbacks is true and category is ALL, else map over and render filteredFeedbacks array */}
			{feedbackList && category === 'all' ? (
				<motion.div className="feedbacks">
					<Sorter by={sortBy}>
						{feedbackList.map((feedback, i) => (
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
							<EmptyFeedback userDetails={false} />
						)}
					</Sorter>
				</div>
			)}
			{/* {filteredFeedbacks.length <= 0 ? <EmptyFeedback /> : null} */}
		</motion.section>
	);
};

export default FeedbackList;
