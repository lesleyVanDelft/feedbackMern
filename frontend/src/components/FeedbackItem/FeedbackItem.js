import { motion } from 'framer-motion';
import { FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DownvoteButton, UpvoteButton } from './VoteButtons/VoteButtons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './FeedbackItem.css';

const FeedbackItem = ({
	feedback,
	index,
	toggleUpvote,
	toggleDownvote,
	roadmap,
	detailsPage,
	detailsCount,
	status,
}) => {
	const [upvoted, setUpvoted] = useState(false);
	const [downvoted, setDownvoted] = useState(false);
	const [count, setCount] = useState(0);
	const user = useSelector(state => state.user);
	const isUpvoted = user && feedback && feedback.upvotedBy.includes(user.id);
	const isDownvoted =
		user && feedback && feedback.downvotedBy.includes(user.id);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!feedback) {
			return <h1>Loading feedback</h1>;
		}
		if (!user) {
			return <h1>loading...</h1>;
		}

		if (feedback.upvotedBy.includes(user.id)) {
			setUpvoted(true);
			setDownvoted(false);
		}
		if (feedback.downvotedBy.includes(user.id)) {
			setDownvoted(true);
			setUpvoted(false);
		}
		if (feedback.pointsCount === undefined) {
			setCount(feedback.upvotedBy.length - feedback.downvotedBy.length);
		} else {
			setCount(feedback.pointsCount);
		}
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
				setUpvoted(!upvoted);
				console.log('isUpvoted is now false');
			} else {
				const updatedUpvotedBy = [...feedback.upvotedBy, user.id];
				const updatedDownvotedBy = feedback.downvotedBy.filter(
					downvote => downvote !== user.id
				);
				dispatch(
					toggleUpvote(feedback._id, updatedUpvotedBy, updatedDownvotedBy)
				);
				setUpvoted(!upvoted);
				console.log('isUpvoted is now true');
			}
		} catch (err) {
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
				setDownvoted(!downvoted);
				console.log('isDownvoted is now false');
			} else {
				const updatedDownvotedBy = [...feedback.downvotedBy, user.id];
				const updatedUpvotedBy = feedback.upvotedBy.filter(
					upvote => upvote !== user.id
				);
				dispatch(
					toggleDownvote(feedback._id, updatedDownvotedBy, updatedUpvotedBy)
				);
				setDownvoted(!downvoted);
				console.log('isDownvoted is now true');
			}
		} catch (err) {
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
			{feedback && (
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
									feedback={feedback}
									upvote={upvoted}
									downvote={downvoted}
									handleUpvote={handleUpvoteToggle}
								/>
								<span className="votes__count">
									{detailsPage ? detailsCount : count}
								</span>

								<DownvoteButton
									user={user}
									feedback={feedback}
									downvote={downvoted}
									upvote={upvoted}
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
						<Link to={`/details/${feedback._id}`}>
							<FaComment className="commentIcon" />
							<span className="commentLength">{feedback.commentCount}</span>
						</Link>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default FeedbackItem;
