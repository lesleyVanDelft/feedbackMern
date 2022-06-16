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
	// const [feedbackList, setFeedbackList] = useState(feedbacks);

	// console.log(feedbackList);
	// useEffect(() => {
	// 	setFeedbackList(feedbacks);
	// 	// console.log('list updated');

	// 	if (!feedbacks) {
	// 		return <h1>Loading</h1>;
	// 	}
	// }, [feedbacks]);

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
				<motion.div className="feedbacks">
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
				</motion.div>
			)}
			{/* {filteredFeedbacks.length <= 0 ? <EmptyFeedback /> : null} */}
		</motion.section>
	);
};

export default FeedbackList;
