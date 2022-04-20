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
		dispatch(getFeedbacks());
		dispatch(setUser());
	}, [dispatch, id]);

	useEffect(() => {
		if (!feedbacks) {
			return <h1>Loading</h1>;
		}
		setFeedbackComments(
			feedbacks.filter(fb => fb._id === id).map(fb => fb.comments)
		);
	}, [feedbacks, id]);

	// useEffect(() => {
	// 	setReplies()
	// }, []);

	if (!feedbacks) {
		return <h1>Loading feedbacks</h1>;
	}

	const filteredFeedbacks = feedbacks.filter(fb => fb._id === id);
	const filteredFeedback = filteredFeedbacks[0];
	// if (!filteredFeedback) {
	// 	return <h1>Loading filtered feedback...</h1>;
	// }
	// console.log(filteredFeedback);

	//////////////////////
	// filtering all feedbacks ?
	//////////////////

	return (
		<>
			{singleFeedback || filteredFeedback ? (
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
							{filteredFeedback.author === user.id && (
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
								@{filteredFeedback.details.username}
							</span>
						</span>
						<FeedbackItem
							feedback={singleFeedback ? singleFeedback : filteredFeedback}
							toggleUpvote={toggleUpvote}
							toggleDownvote={toggleDownvote}
							detailsPage={true}
							detailsCount={
								filteredFeedback.upvotedBy.length -
								filteredFeedback.downvotedBy.length
							}
							// isUpvotedDetails={isUpvotedDetails}
							// isDownvotedDetails={isDownvotedDetails}
							// downvoteActive={getDownvote}
						/>
						<CommentSection
							comments={filteredFeedback.comments}
							feedbackId={id}
							currentFeedback={filteredFeedback}
						/>
					</main>
				</>
			) : (
				<h1>Loading</h1>
			)}
		</>
	);
};

export default Details;
