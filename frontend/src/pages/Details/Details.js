import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '../../components/Spinner';
import { getSingleFeedback } from '../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import CommentSection from '../../components/CommentSection/CommentSection';
import { setUser } from '../../reducers/userReducer';
import LogoBar from '../../components/LogoBar/LogoBar';
import { toggleUpvote, toggleDownvote } from '../../reducers/feedbackReducer';
import './Details.css';

const Details = () => {
	const singleFeedback = useSelector(state => state.singleFeedback);
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);

	// hooks
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let { id } = useParams();

	useEffect(() => {
		dispatch(getSingleFeedback(id));
		dispatch(setUser());
	}, [dispatch, id]);

	if (!singleFeedback) {
		// console.log('details');
		return <h1>Loading...</h1>;
	}
	// console.log(feedbacks);

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
							toggleDownvote={toggleDownvote}
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
