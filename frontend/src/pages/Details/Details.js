import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '../../components/Spinner';
// import { getSingleFeedback } from '../../reducers/feedbackCommentsReducer';
import { getSingleFeedback } from '../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import CommentSection from '../../components/CommentSection/CommentSection';
import { setUser } from '../../reducers/userReducer';
import LogoBar from '../../components/LogoBar/LogoBar';
import {
	toggleUpvote,
	toggleDownvote,
	getFeedbacks,
} from '../../reducers/feedbackReducer';
import {
	toggleUpvoteDetails,
	toggleDownvoteDetails,
} from '../../reducers/feedbackCommentsReducer';
import { motion } from 'framer-motion';
import './Details.css';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Details = () => {
	// const [upvoteActive, setUpvoteActive] = useState(false);
	// const [downvoteActive, setDownvoteActive] = useState(false);
	const [feedbackComments, setFeedbackComments] = useState([]);
	const [replies, setReplies] = useState([]);
	const singleFeedback = useSelector(state => state.singleFeedback);
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	// const isUpvotedDetails = user && singleFeedback.upvotedBy.includes(user.id);
	// const isDownvotedDetails =
	// 	user && singleFeedback.downvotedBy.includes(user.id);
	// console.log(isUpvotedDetails, 'upvote');
	// console.log(isDownvotedDetails, 'downvote');

	// hooks
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let { id } = useParams();

	useEffect(() => {
		dispatch(getSingleFeedback(id));
		dispatch(setUser());
	}, [dispatch, id]);

	// if (!singleFeedback) {
	// 	return <h1>loading</h1>;
	// }

	const initialMotion = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.5,
				// ease: [0.87, 0, 0.13, 1],
			},
		},
	};

	return (
		<>
			{singleFeedback ? (
				<>
					<motion.main
						className="Details"
						variants={initialMotion}
						initial="initial"
						animate="animate">
						<LogoBar />

						<div className="Details__content">
							<div className="Details__content--buttons">
								<button className="back">
									<Link to="/">
										<FaChevronLeft /> <span>Go Back</span>
									</Link>
								</button>
								{singleFeedback.author === user.id && (
									<Link to={`/edit/${id}`}>
										<button className="btn btn-blue edit">Edit Feedback</button>
									</Link>
								)}
							</div>
							<span className="postedBy">
								Posted by:
								<span className="username">
									@{singleFeedback.details.username}
								</span>
							</span>
							<FeedbackItem
								feedback={singleFeedback}
								toggleUpvote={toggleUpvoteDetails}
								toggleDownvote={toggleDownvoteDetails}
								detailsPage={true}
								detailsCount={
									singleFeedback.upvotedBy.length -
									singleFeedback.downvotedBy.length
								}
								// isUpvotedDetails={isUpvotedDetails}
								// isDownvotedDetails={isDownvotedDetails}
								// downvoteActive={getDownvote}
							/>
							<CommentSection
								comments={singleFeedback.comments}
								feedbackId={id}
								currentFeedback={singleFeedback}
							/>
						</div>
					</motion.main>
				</>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
};

export default Details;
