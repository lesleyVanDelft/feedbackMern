import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toggleUpvote, toggleDownvote } from '../../reducers/feedbackReducer';
import { AnimatePresence, motion } from 'framer-motion';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import EmptyFeedback from '../../components/EmptyFeedback/EmptyFeedback';
import Sorter from '../Sorter/Sorter';
import SuggestionsHeader from '../Suggestions/SuggestionsHeader/SuggestionsHeader';
import './FeedbackList.css';
import moment from 'moment';

const FeedbackList = ({ category }) => {
	const [sortBy, setSortBy] = useState('Most Upvotes');
	const feedbackList = useSelector(state => state.feedbacks);
	const [sortList, setSortList] = useState(feedbackList);

	useEffect(() => {
		setSortList(feedbackList);
	}, [feedbackList]);

	console.log(sortList);

	// console.log(feedbackList.sort((a,b) => ));
	// const listSorter = list => {
	// 	const date = moment().format(list.upd)
	// 	const sorted = list.sort((a, b) => {
	// 		console.log(a);
	// 		return b - a;
	// 	});
	// 	return sorted;
	// };

	// listSorter(feedbackList);

	// useEffect(() => {
	// 	setSortList(
	// 		feedbackList.sort((a, b) => {
	// 			return b.upvotedBy.length - a.upvotedBy.length;
	// 		})
	// 	);
	// }, [feedbackList]);

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
			translateX: -40,
		},
		animate: {
			opacity: 1,
			translateX: 0,
			transition: {
				// duration: 0.3,
				staggerChildren: 21.5,
			},
		},
		// transition: {
		// 	// duration: 0.3,
		// },
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
		// transition: {
		// 	duration: 0.3,
		// },
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
			{/* <AnimatePresence> */}
			{feedbackList && category === 'all' ? (
				<motion.div
					className="feedbacks"
					// variants={framerContainer}
					// initial="initial"
					// animate="animate"
				>
					<Sorter by={sortBy}>
						{feedbackList.map((feedback, i) => (
							<FeedbackItem
								// variants={framerItem}
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
				<div
					className="feedbacks"
					// variants={framerContainer}
					// initial="initial"
					// animate="animate"
				>
					<Sorter by={sortBy}>
						{filteredFeedbacks.length > 0 && category !== 'all' ? (
							filteredFeedbacks.map((feedback, i) => {
								// console.log(moment.format(feedback.updatedAt));
								return (
									<FeedbackItem
										// variants={framerItem}
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
			{/* </AnimatePresence> */}
			{/* {filteredFeedbacks.length <= 0 ? <EmptyFeedback /> : null} */}
		</motion.section>
	);
};

export default FeedbackList;
