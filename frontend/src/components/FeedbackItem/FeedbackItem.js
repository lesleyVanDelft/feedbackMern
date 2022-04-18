import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DownvoteButton, UpvoteButton } from './VoteButtons/VoteButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedbacks } from '../../reducers/feedbackReducer';
import { useEffect, useState } from 'react';
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
	const [downvoted, setDownvoted] = useState(false);
	const user = useSelector(state => state.user);
	const singleFeedback = useSelector(state => state.singleFeedback);
	const isUpvoted = user && feedback.upvotedBy.includes(user.id);
	const isDownvoted = user && feedback.downvotedBy.includes(user.id);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			return <h1>loading...</h1>;
		}

		if (!feedback) {
			return <h1>Loading feedback</h1>;
		}
		if (feedback.upvotedBy.includes(user.id)) {
			setUpvoted(true);
			setDownvoted(false);
		}
		if (feedback.downvotedBy.includes(user.id)) {
			setDownvoted(true);
			setUpvoted(false);
		}

		// console.log(feedback.pointsCount);
	}, [user, feedback.upvotedBy, feedback.downvotedBy, feedback]);

	const handleUpvoteToggle = async e => {
		e.preventDefault();
		try {
			if (isUpvoted) {
				const updatedUpvotedBy = feedback.upvotedBy.filter(
					upvote => upvote !== user.id
				);
				dispatch(
					toggleUpvote(feedback._id, updatedUpvotedBy, feedback.downvotedBy)
				);
				setUpvoted(false);
				// setDownvoted(false);
			} else {
				const updatedUpvotedBy = [...feedback.upvotedBy, user.id];
				const updatedDownvotedBy = feedback.downvotedBy.filter(
					downvote => downvote !== user.id
				);
				dispatch(
					toggleUpvote(feedback._id, updatedUpvotedBy, updatedDownvotedBy)
				);
				setUpvoted(false);
				// setDownvoted(false);
			}
		} catch (err) {
			// dispatch(notify(getErrorMsg(err), 'error'));
			console.log(err);
		}
	};
	const handleDownvoteToggle = async e => {
		e.preventDefault();
		try {
			if (isDownvoted) {
				const updatedDownvotedBy = feedback.downvotedBy.filter(
					downvote => downvote !== user.id
				);
				dispatch(
					toggleDownvote(feedback._id, updatedDownvotedBy, feedback.upvotedBy)
				);
				// setVoteCount(prevState => prevState + 1);
				setDownvoted(false);
				// setUpvoted(false);
			} else {
				const updatedDownvotedBy = [...feedback.downvotedBy, user.id];
				const updatedUpvotedBy = feedback.upvotedBy.filter(
					upvote => upvote !== user.id
				);
				dispatch(
					toggleDownvote(feedback._id, updatedDownvotedBy, updatedUpvotedBy)
				);
				// setVoteCount(prevState => prevState - 1);
				setDownvoted(true);
				setUpvoted(false);
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
									{/* {feedback.upvotedBy.length} */}
									{feedback.pointsCount === undefined
										? feedback.upvotedBy.length
										: feedback.pointsCount}
								</span>

								{/* <button className="votes__downvote">
									<FaChevronDown className="chevronDown" />
								</button> */}
								<DownvoteButton
									user={user}
									body={feedback}
									active={downvoted}
									handleDownvote={handleDownvoteToggle}
								/>
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
		</>
	);
	// return <div>{feedback._id}</div>;
};

export default FeedbackItem;
