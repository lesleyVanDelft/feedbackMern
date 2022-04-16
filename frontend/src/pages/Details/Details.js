import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '../../components/Spinner';
// import {
// 	getSingleFeedback,
// 	reset,
// } from '../../features/feedbacks/feedbackSlice';
import { getSingleFeedback } from '../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import './Details.css';
import CommentSection from '../../components/CommentSection/CommentSection';
import EditFeedbackForm from '../../components/EditFeedbackForm/EditFeedbackForm';
import { getFeedbackComments } from '../../reducers/feedbackCommentsReducer';
// import { toggleUpvote } from '../../reducers/feedbackReducer';
import { toggleUpvote } from '../../reducers/feedbackCommentsReducer';
import { setUser } from '../../reducers/userReducer';
import LogoBar from '../../components/LogoBar/LogoBar';
import { getFeedbacks } from '../../reducers/feedbackReducer';
// import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
// import Dashboard from '../components/Dashboard/Dashboard';
// import Suggestions from '../components/Suggestions/Suggestions';

const Details = () => {
	const singleFeedback = useSelector(state => state.singleFeedback);
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);

	// hooks
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let { id } = useParams();
	// console.log(feedbacks.filter(fb => fb._id === id));
	// const currentFeedback = feedbacks.filter(fb => fb._id === id);
	// useEffect(() => {
	// 	// if (!singleFeedback) {
	// 	// 	return <h2>Loading</h2>;
	// 	// }
	// 	try {
	// 		dispatch(setUser());
	// 		// dispatch(getFeedbacks());
	// 		dispatch()
	// 		// dispatch(getFeedbackComments(id));
	// 	} catch (error) {
	// 		console.log(error + 'details useEffect');
	// 	}
	// }, []);

	useEffect(() => {
		dispatch(getSingleFeedback(id));
		dispatch(setUser());
	}, [dispatch, id]);

	if (!singleFeedback) {
		// console.log('details');
		return <h1>Loading...</h1>;
	}

	// console.log(singleFeedback);
	return (
		<>
			{singleFeedback ? (
				<>
					{/* <p>{singleFeedback.status}</p> */}
					<LogoBar />
					<main className="Details">
						<div className="Details__buttons">
							<button className="back">
								<Link to="/">
									<FaChevronLeft /> <span>Go Back</span>
								</Link>
							</button>
							{singleFeedback.author._id === user.id && (
								<Link to={`/edit/${id}`}>
									<button className="btn btn-blue edit">Edit Feedback</button>
								</Link>
							)}
						</div>
						<span className="postedBy">
							Posted by:
							{/* {singleFeedback.length > 0 && singleFeedback.details.username && (
						<span className="username">@{singleFeedback.details.username}</span>
					)} */}
							<span className="username">{singleFeedback.author.username}</span>
						</span>
						<FeedbackItem
							feedback={singleFeedback}
							toggleUpvote={toggleUpvote}
						/>
						<CommentSection
							comments={singleFeedback.comments}
							feedbackId={id}
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
