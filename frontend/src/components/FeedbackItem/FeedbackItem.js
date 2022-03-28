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

// const FeedbackItem = ({ feedback, index }) => {
// 	const { user } = useSelector(state => state.auth);
// 	// const [likedFeedbackId, setLikedFeedbackId] = useState();
// 	const [currLikedFeedback, setCurrLikedFeedback] = useState();
// 	const { feedbacks } = useSelector(state => {
// 		return state.feedbacks;
// 	});

// 	const dispatch = useDispatch();

// 	// let voteCount = 0;
// 	// useEffect(() => {
// 	// 	return feedback.likes ? voteCount = feedback.likes.length : null
// 	// }, [])

// const upvoteData = {
// 	_id: feedback._id,
// 	likedBy: user,
// };

// 	const handleClick = e => {
// 		e.preventDefault();
// 		dispatch(likeComment(upvoteData));
// 		const likedFeedbackFilter = feedbacks.filter(
// 			stateFeedback => stateFeedback._id === feedback._id
// 		);
// 		setCurrLikedFeedback(likedFeedbackFilter);
// 		console.log(likedFeedbackFilter);

// 		setTimeout(() => {
// 			dispatch(getFeedbacks());
// 		}, 250);
// 	};

// 	return (
// 		<motion.div
// 			initial={framerList.initial}
// 			animate={framerList.animate}
// 			transition={framerList.transition}
// 			className="FeedbackItem">
// 			{/* make this form maybe? */}
// 			<form className="FeedbackItem__left" onSubmit={handleClick}>
// 				<div className="FeedbackItem__left--voteBtn">
// 					<button className="votes" type="submit">
// 						<FaChevronUp className="chevronUp" />
// 						<span>{feedback.likes.length}</span>
// 					</button>
// 				</div>
// 				<div className="FeedbackItem__left--content">
// 					<Link to={`/details/${feedback._id}`}>
// 						<h3 className="title">{feedback.title}</h3>
// 					</Link>
// 					<p className="text">{feedback.text}</p>
// 					<button className="feedbackTypeBtn">{feedback.feedbackType}</button>
// 				</div>
// 			</form>

// 			<div className="FeedbackItem__right">
// 				<FaComment className="commentIcon" />
// 				<span className="commentLength">
// 					<Link to={`/details/${feedback._id}`}>
// 						{feedback.comments.length > 0 ? feedback.comments.length : 0}
// 					</Link>
// 				</span>
// 			</div>

// 			{/* <p className="FeedbackItem__text">{feedback.feedbackType}</p> */}
// 			{/* <button onClick={() => dispatch(deleteFeedback(feedback._id))}>
// 				delete me
// 			</button> */}
// 		</motion.div>
// 	);
// };

const FeedbackItem = ({ feedback, index, toggleUpvote, toggleDownvote }) => {
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

	/* adding new feedback redux action and toast need work */

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
