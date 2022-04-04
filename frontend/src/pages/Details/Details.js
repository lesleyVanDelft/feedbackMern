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
import { setUser } from '../../reducers/userReducer';

// import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
// import Dashboard from '../components/Dashboard/Dashboard';
// import Suggestions from '../components/Suggestions/Suggestions';

const Details = () => {
	const feedbackComments = useSelector(state => state.feedbackComments);
	const user = useSelector(state => state.user);

	// console.log(feedbackComments.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let { id } = useParams();

	useEffect(() => {
		dispatch(setUser());
		dispatch(getFeedbackComments(id));
	}, []);
	// console.log(id);

	// useSelector(state => console.log(state));
	// get user state from auth redux store
	// const { feedbacks, isLoading, isError, message } = useSelector(state => {
	// 	return state.feedbacks;
	// });
	// const [singleFeedback, setSingleFeedback] = useState(feedbacks);

	// useEffect(() => {
	// 	dispatch(getSingleFeedback(id));
	// 	setSingleFeedback(feedbacks.filter(feedback => feedback._id === id));
	// }, [dispatch]);

	// console.log(setSingleFeedback);

	// if (!feedback) {
	// 	return <Spinner />;
	// }

	// if(!feedback){
	// 	return <h2>Loading</h2>
	// }

	// if (!user) {
	// 	return <h2>Loading USER</h2>;
	// }

	// if (!user) {
	// 	navigate('/login');
	// }
	if (!feedbackComments) {
		return <h2>Loading</h2>;
	}

	return (
		<main className="Details">
			<div className="Details__buttons">
				<button className="back">
					<Link to="/">
						<FaChevronLeft /> <span>Go Back</span>
					</Link>
				</button>
				{/* {user && user._id === singleFeedback[0].user ? (
					<Link to={`/edit/${id}`}>
						<button className="btn btn-blue edit">Edit Feedback</button>
					</Link>
				) : null} */}
				{/* {user && user.id === feedbackComments.user && ( */}
				<Link to={`/edit/${id}`}>
					<button className="btn btn-blue edit">Edit Feedback</button>
				</Link>
				{/* )} */}
			</div>
			<FeedbackItem feedback={feedbackComments} />

			{/* {feedbacks.length > 0
				? feedbacks.map(feedback => {
						return <FeedbackItem feedback={feedback} key={feedback._id} />;
				  })
				: 'loading'} */}

			{/* {singleFeedback && <FeedbackItem feedback={singleFeedback[0]} />} */}
			{/* {console.log(singleFeedback)} */}

			<CommentSection comments={feedbackComments.comments} feedbackId={id} />
		</main>
	);
};

export default Details;
