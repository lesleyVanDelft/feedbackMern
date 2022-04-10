import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '../../components/Spinner';
import {
	getSingleFeedback,
	reset,
} from '../../features/feedbacks/feedbackSlice';
import { useParams } from 'react-router-dom';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import './Details.css';
import CommentSection from '../../components/CommentSection/CommentSection';
import EditFeedbackForm from '../../components/EditFeedbackForm/EditFeedbackForm';
import { getFeedbackComments } from '../../reducers/feedbackCommentsReducer';
import { toggleUpvote } from '../../reducers/feedbackReducer';
import { setUser } from '../../reducers/userReducer';

// import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
// import Dashboard from '../components/Dashboard/Dashboard';
// import Suggestions from '../components/Suggestions/Suggestions';

const Details = () => {
	const feedbackComments = useSelector(state => state.feedbackComments);
	const user = useSelector(state => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let { id } = useParams();

	useEffect(() => {
		dispatch(setUser());
		dispatch(getFeedbackComments(id));
	}, []);

	if (!feedbackComments) {
		return <h2>Loading</h2>;
	}

	return (
		<>
			<main className="Details">
				<div className="Details__buttons">
					<button className="back">
						<Link to="/">
							<FaChevronLeft /> <span>Go Back</span>
						</Link>
					</button>
					{feedbackComments.author.id === user.id && (
						<Link to={`/edit/${id}`}>
							<button className="btn btn-blue edit">Edit Feedback</button>
						</Link>
					)}
				</div>
				<span className="postedBy">
					Posted by:
					{feedbackComments.author.username && (
						<span className="username">
							@{feedbackComments.author.username}
						</span>
					)}
				</span>
				<FeedbackItem
					feedback={feedbackComments}
					origin={'details'}
					toggleUpvote={toggleUpvote}
				/>
				<CommentSection comments={feedbackComments.comments} feedbackId={id} />
			</main>
		</>
	);
};

export default Details;
