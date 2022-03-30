import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaComment } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getFeedbacks,
	likeComment,
} from '../../features/feedbacks/feedbackSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUpvote, toggleDownvote } from '../../reducers/feedbackReducer';
import { useEffect, useState } from 'react';
import './FeedbackItem.css';

const FeedbackItem = ({ feedback, index, toggleUpvote, toggleDownvote }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	// console.log(feedback);
	// console.log(user.id);
	const isUpvoted = user && feedback.upvotedBy.includes(user.id);
	const isDownvoted = user && feedback.downvotedBy.includes(user.id);

	const handleUpvoteToggle = async () => {
		try {
			if (isUpvoted) {
				const updatedUpvotedBy = feedback.upvotedBy.filter(u => u !== user.id);
				dispatch(
					toggleUpvote(feedback.id, updatedUpvotedBy, feedback.downvotedBy)
				);
			} else {
				const updatedUpvotedBy = [...feedback.upvotedBy, user.id];
				const updatedDownvotedBy = feedback.downvotedBy.filter(
					d => d !== user.id
				);
				dispatch(
					toggleUpvote(feedback.id, updatedUpvotedBy, updatedDownvotedBy)
				);
			}
		} catch (err) {
			// dispatch(notify(getErrorMsg(err), 'error'));
			console.log(err);
		}
	};

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
						<button
							className="votes__upvote"
							onClick={() => handleUpvoteToggle()}>
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
