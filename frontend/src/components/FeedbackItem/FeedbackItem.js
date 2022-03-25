// import { useDispatch } from 'react-redux';
// import { deleteFeedback } from '../../features/feedbacks/feedbackSlice';
import { motion } from 'framer-motion';
import { FaChevronUp, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { likeComment } from '../../features/feedbacks/feedbackSlice';
import { useDispatch, useSelector } from 'react-redux';
import './FeedbackItem.css';
import { useEffect, useState } from 'react';

const FeedbackItem = ({ feedback, index }) => {
	const { user } = useSelector(state => state.auth);
	// const [likedFeedbackId, setLikedFeedbackId] = useState();
	// console.log(user);
	// console.log(feedback._id);
	const dispatch = useDispatch();

	// console.log(likedFeedbackId);
	const framerList = {
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
			delay: index ? index * 0.1 : 0,
		},
	};
	const upvoteData = {
		_id: feedback._id,
		likedBy: user,
	};

	// console.log(upvoteData);
	// const handleUpvote = () => {
	// 	console.log('handleUpvote test');
	// 	return dispatch(feedbackService.likeComment(upvoteData));
	// };

	return (
		<motion.div
			initial={framerList.initial}
			animate={framerList.animate}
			transition={framerList.transition}
			className="FeedbackItem">
			{/* make this form maybe? */}
			<div className="FeedbackItem__left">
				<div className="FeedbackItem__left--voteBtn">
					<button
						className="votes"
						onClick={() => dispatch(likeComment(upvoteData))}>
						<FaChevronUp className="chevronUp" />
						<span>{feedback.likes.length}</span>
					</button>
				</div>
				<div className="FeedbackItem__left--content">
					<Link to={`/details/${feedback._id}`}>
						<h3 className="title">{feedback.title}</h3>
					</Link>
					<p className="text">{feedback.text}</p>
					<button className="feedbackTypeBtn">{feedback.feedbackType}</button>
				</div>
			</div>

			<div className="FeedbackItem__right">
				<FaComment className="commentIcon" />
				<span className="commentLength">
					<Link to={`/details/${feedback._id}`}>
						{feedback.comments.length > 0 ? feedback.comments.length : 0}
					</Link>
				</span>
			</div>

			{/* <p className="FeedbackItem__text">{feedback.feedbackType}</p> */}
			{/* <button onClick={() => dispatch(deleteFeedback(feedback._id))}>
				delete me
			</button> */}
		</motion.div>
	);
};

export default FeedbackItem;
