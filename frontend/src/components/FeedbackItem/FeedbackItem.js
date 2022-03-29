import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
	getFeedbacks,
	likeComment,
} from '../../features/feedbacks/feedbackSlice';
import { useDispatch, useSelector } from 'react-redux';
import './FeedbackItem.css';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

const FeedbackItem = ({ feedback, index, toggleUpvote, toggleDownvote }) => {
	const user = useSelector(state => state.user);
	// console.log(user.id);
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

	return (
		<motion.div
			initial={framerList.initial}
			animate={framerList.animate}
			transition={framerList.transition}
			className="FeedbackItem">
			{/* make this form maybe? */}
			<div className="FeedbackItem__left">
				<div className="FeedbackItem__left--voteBtn">
					<div className="votes">
						<button className="votes__upvote">
							<FaChevronUp className="chevronUp" />
						</button>
						<span>{0}</span>
						<button className="votes__downvote">
							<FaChevronDown className="chevronDown" />
						</button>
					</div>
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
					<Link to={`/details/${feedback._id}`}>{feedback.commentCount}</Link>
				</span>
			</div>

			{/* <p className="FeedbackItem__text">{feedback.feedbackType}</p> */}
			{/* <button onClick={() => dispatch(deleteFeedback(feedback._id))}>
					delete me
				</button> */}
		</motion.div>
	);
	// return <div>{feedback._id}</div>;
};

export default FeedbackItem;
