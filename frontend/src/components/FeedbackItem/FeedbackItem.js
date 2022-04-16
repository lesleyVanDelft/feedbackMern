import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaComment } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import {
// 	getFeedbacks,
// 	likeComment,
// } from '../../features/feedbacks/feedbackSlice';
import { UpvoteButton } from './VoteButtons/VoteButtons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUpvote, toggleDownvote } from '../../reducers/feedbackReducer';
import { getFeedbacks } from '../../reducers/feedbackReducer';
import { useEffect, useState } from 'react';
// import { UpvoteButton } from './VoteButtons/VoteButtons';
import './FeedbackItem.css';

const FeedbackItem = ({
	feedback,
	index,
	toggleUpvote,
	toggleDownvote,
	roadmap,
	status,
}) => {
	const [upvoted, setUpvoted] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
<<<<<<< HEAD
	const isUpvoted = user && feedback.upvotedBy.includes(user.id);
	const isDownvoted = user && feedback.downvotedBy.includes(user.id);

	useEffect(() => {
=======
	const singleFeedback = useSelector(state => state.singleFeedback);
	const isUpvoted = user && feedback.upvotedBy.includes(user.id);
	const isDownvoted = user && feedback.downvotedBy.includes(user.id);
	// const currentFeedback = useSelector(state => state.feedbackComments);

	useEffect(() => {
		if (!user) {
			return <h1>loading...</h1>;
		}

		if (!feedback) {
			return <h1>Loading feedback</h1>;
		}
>>>>>>> toolkittesting
		if (feedback.upvotedBy.includes(user.id)) {
			setUpvoted(true);
		} else {
			setUpvoted(false);
		}
<<<<<<< HEAD
	}, [user, feedback.upvotedBy]);
=======
	}, [user, feedback.upvotedBy, feedback]);
>>>>>>> toolkittesting

	const handleUpvoteToggle = async e => {
		e.preventDefault();
		try {
			if (isUpvoted) {
				const updatedUpvotedBy = feedback.upvotedBy.filter(u => u !== user.id);
				dispatch(
					toggleUpvote(feedback._id, updatedUpvotedBy, feedback.downvotedBy)
				);
				setUpvoted(true);
				// dispatch(getFeedbacks());
			} else {
				const updatedUpvotedBy = [...feedback.upvotedBy, user.id];
				const updatedDownvotedBy = feedback.downvotedBy.filter(
					d => d !== user.id
				);
				dispatch(
					toggleUpvote(feedback._id, updatedUpvotedBy, updatedDownvotedBy)
				);
				setUpvoted(false);
				// dispatch(getFeedbacks());
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
		<>
<<<<<<< HEAD
			<motion.div
				initial={framerList.initial}
				animate={framerList.animate}
				transition={framerList.transition}
				className={`FeedbackItem ${roadmap && 'roadmap'} ${roadmap && status}`}>
				<div className="FeedbackItem__left">
					<div className="FeedbackItem__left--voteBtn">
						<div className="votes">
							{/* <button
							user={user}
							body={feedback}
							className={`votes__upvote ${upvoted ? 'active' : ''}`}
							onClick={e => handleUpvoteToggle(e)}>
							<FaChevronUp className="chevronUp" />
						</button> */}
							<UpvoteButton
								user={user}
								body={feedback}
								active={upvoted}
								handleUpvote={handleUpvoteToggle}
							/>
							<span className="votes__count">{feedback.upvotedBy.length}</span>
							<button className="votes__downvote">
								<FaChevronDown className="chevronDown" />
							</button>
						</div>
					</div>
					<div className="FeedbackItem__left--content">
						{roadmap && (
							<ul className="status">
								<li>{status}</li>
							</ul>
						)}
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
			</motion.div>
=======
			{(feedback || singleFeedback) && (
				<motion.div
					initial={framerList.initial}
					animate={framerList.animate}
					transition={framerList.transition}
					className={`FeedbackItem ${roadmap && 'roadmap'} ${
						roadmap && status
					}`}>
					<div className="FeedbackItem__left">
						<div className="FeedbackItem__left--voteBtn">
							<div className="votes">
								<UpvoteButton
									user={user}
									body={feedback}
									active={upvoted}
									handleUpvote={handleUpvoteToggle}
								/>
								<span className="votes__count">
									{feedback.upvotedBy.length}
								</span>

								<button className="votes__downvote">
									<FaChevronDown className="chevronDown" />
								</button>
							</div>
						</div>
						<div className="FeedbackItem__left--content">
							{roadmap && (
								<ul className="status">
									<li>{status}</li>
								</ul>
							)}
							<Link to={`/details/${feedback._id}`}>
								<h3 className="title">{feedback.title}</h3>
							</Link>
							<p className="text">{feedback.text}</p>
							<button className="feedbackTypeBtn">
								{feedback.feedbackType}
							</button>
						</div>
					</div>

					<div className="FeedbackItem__right">
						<FaComment className="commentIcon" />
						<span className="commentLength">
							<Link to={`/details/${feedback._id}`}>
								{feedback.commentCount}
							</Link>
						</span>
					</div>
				</motion.div>
			)}
>>>>>>> toolkittesting
		</>
	);
	// return <div>{feedback._id}</div>;
};

export default FeedbackItem;
