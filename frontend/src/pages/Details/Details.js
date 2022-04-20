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
import './Details.css';

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

		// setTimeout(() => {
		// 	dispatch(getFeedbacks());
		// }, 500);
	}, [dispatch, id]);

	// if (!feedbacks) {
	// 	return <h1>Loading feedbacks</h1>;
	// }

	// const filteredFeedbacks = feedbacks.filter(fb => fb._id === id);
	// const filteredFeedback = filteredFeedbacks[0];
	// if (!filteredFeedback) {
	// 	return <h1>Loading filtered feedback...</h1>;
	// }
	if (!singleFeedback) {
		return <h1>loading</h1>;
	}
	// console.log(filteredFeedback);

	//////////////////////
	// filtering all feedbacks ?
	//////////////////

	return (
		<>
			{singleFeedback ? (
				<>
					{/* <p>{filteredFeedback.status}</p> */}
					<LogoBar />
					<main className="Details">
						<div className="Details__buttons">
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
							{/* {filteredFeedback.length > 0 && filteredFeedback.details.username && (
						<span className="username">@{filteredFeedback.details.username}</span>
					)} */}
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
					</main>
				</>
			) : (
				<h1>Loading ,,,</h1>
			)}
		</>
	);
};

export default Details;
