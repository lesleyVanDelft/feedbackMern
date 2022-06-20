import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleUpvote, toggleDownvote } from '../../reducers/feedbackReducer';
import { AnimatePresence, motion } from 'framer-motion';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import EmptyFeedback from '../../components/EmptyFeedback/EmptyFeedback';
import Sorter from '../Sorter/Sorter';
import SuggestionsHeader from '../Suggestions/SuggestionsHeader/SuggestionsHeader';
import './FeedbackList.css';
import * as dayjs from 'dayjs';

const FeedbackList = ({ category }) => {
	const [sortBy, setSortBy] = useState('Most Upvotes');
	const feedbacks = useSelector(state => state.feedbacks);
	// const [sortList, setSortList] = useState(feedbackList);
	const [feedbackList, setFeedbackList] = useState([...feedbacks]);
	const [filteredList, setFilteredList] = useState([...feedbackList]);
	useEffect(() => {
		setFeedbackList([...feedbacks]);
	}, [feedbacks, sortBy]);

	useEffect(() => {
		setFilteredList([
			...feedbackList
				.filter(feedback => {
					return feedback.feedbackType.toString().toLowerCase() === category;
				})
				.sort((a, b) => {
					if (sortBy === 'Most Upvotes') {
						return b.upvotedBy.length - a.upvotedBy.length;
					} else if (sortBy === 'Least Upvotes') {
						return a.upvotedBy.length - b.upvotedBy.length;
					} else if (sortBy === 'Most Comments') {
						return b.upvotedBy.length - a.upvotedBy.length;
					} else if (sortBy === 'Least Comments') {
						return a.upvotedBy.length - b.upvotedBy.length;
					} else if (sortBy === 'Newest') {
						return (
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						);
					} else if (sortBy === 'Oldest') {
						return (
							new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
						);
					} else {
						return null;
					}
				}),
		]);
	}, [category, feedbackList, sortBy]);
	if (!feedbackList) {
		return <h1>Loading</h1>;
	}

	// Filter feedbacks on selected category
	// const filteredFeedbacks =
	// 	feedbackList.length > 0
	// 		? feedbackList
	// 				.filter(feedback => {
	// 					return feedback.feedbackType.toString().toLowerCase() === category;
	// 				})
	// 				.sort((a, b) => {
	// 					if (sortBy === 'Most Upvotes') {
	// 						return b.upvotedBy.length - a.upvotedBy.length;
	// 					} else if (sortBy === 'Least Upvotes') {
	// 						return a.upvotedBy.length - b.upvotedBy.length;
	// 					} else if (sortBy === 'Most Comments') {
	// 						return b.upvotedBy.length - a.upvotedBy.length;
	// 					} else if (sortBy === 'Least Comments') {
	// 						return a.upvotedBy.length - b.upvotedBy.length;
	// 					} else if (sortBy === 'Newest') {
	// 						return (
	// 							new Date(b.createdAt).getTime() -
	// 							new Date(a.createdAt).getTime()
	// 						);
	// 					} else if (sortBy === 'Oldest') {
	// 						return (
	// 							new Date(a.createdAt).getTime() -
	// 							new Date(b.createdAt).getTime()
	// 						);
	// 					} else {
	// 						return null;
	// 					}
	// 				})
	// 		: [];

	const getSortBy = sortState => {
		setSortBy(sortState);
	};

	// const framerContainer = {
	// 	initial: {
	// 		opacity: 0,
	// 		translateX: -40,
	// 	},
	// 	animate: {
	// 		opacity: 1,
	// 		translateX: 0,
	// 		transition: {
	// 			// duration: 0.3,
	// 			// staggerChildren: 5.5,
	// 		},
	// 	},
	// 	// transition: {
	// 	// 	// duration: 0.3,
	// 	// },
	// };

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

			{/* Loop and sort if feedbacks is true and category is ALL, else map over and render filteredFeedbacks array */}
			{feedbackList && category === 'all' ? (
				<motion.div
					className="feedbacks"
					// variants={framerContainer}
					initial="initial"
					animate="animate">
					{feedbackList
						.sort((a, b) => {
							if (sortBy === 'Most Upvotes') {
								return b.upvotedBy.length - a.upvotedBy.length;
							} else if (sortBy === 'Least Upvotes') {
								return a.upvotedBy.length - b.upvotedBy.length;
							} else if (sortBy === 'Most Comments') {
								return b.upvotedBy.length - a.upvotedBy.length;
							} else if (sortBy === 'Least Comments') {
								return a.upvotedBy.length - b.upvotedBy.length;
							} else if (sortBy === 'Newest') {
								return (
									new Date(b.createdAt).getTime() -
									new Date(a.createdAt).getTime()
								);
							} else if (sortBy === 'Oldest') {
								return (
									new Date(a.createdAt).getTime() -
									new Date(b.createdAt).getTime()
								);
							} else {
								return null;
							}
						})
						.map((feedback, i) => (
							<FeedbackItem
								key={feedback._id}
								feedback={feedback}
								index={i}
								toggleUpvote={toggleUpvote}
								toggleDownvote={toggleDownvote}
							/>
						))}
				</motion.div>
			) : (
				<motion.div className="feedbacks">
					{filteredList.length > 0 && category !== 'all' ? (
						filteredList.map((feedback, i) => {
							return (
								<FeedbackItem
									key={feedback._id}
									// variants={framerItem}
									feedback={feedback}
									index={i}
									toggleUpvote={toggleUpvote}
									toggleDownvote={toggleDownvote}
								/>
							);
						})
					) : (
						<EmptyFeedback userDetails={false} />
					)}
				</motion.div>
			)}
		</motion.section>
	);
};

export default FeedbackList;
