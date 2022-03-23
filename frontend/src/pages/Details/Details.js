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

// import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
// import Dashboard from '../components/Dashboard/Dashboard';
// import Suggestions from '../components/Suggestions/Suggestions';

const Details = () => {
	// const [isEditing, setIsEditing] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	let { id } = useParams();
	// console.log(id);

	// useSelector(state => console.log(state));
	// get user state from auth redux store
	const { user } = useSelector(state => state.auth);
	const { feedbacks, isLoading, isError, message } = useSelector(state => {
		return state.feedbacks;
	});
	const [singleFeedback, setSingleFeedback] = useState(feedbacks);

	// const filteredFeedback = feedbacks.filter(feedback => feedback._id === id);

	// useEffect(() => {
	// if (isError) {
	// 	console.log(message);
	// }
	// if (!user) {
	// 	navigate('/login');
	// }
	// console.log(feedbacks);
	// return () => {
	// 	dispatch(reset());
	// };
	// }, [user, navigate, isError, message, dispatch, id]);

	useEffect(() => {
		setSingleFeedback(feedbacks.filter(feedback => feedback._id === id));
		// dispatch(getSingleFeedback(id));
	}, []);

	// console.log(setSingleFeedback);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<main className="Details">
			<div className="Details__buttons">
				<button className="back">
					<Link to="/">
						<FaChevronLeft /> <span>Go Back</span>
					</Link>
				</button>
				{user._id === singleFeedback[0].user ? (
					<Link to={`/edit/${id}`}>
						<button className="btn btn-blue edit">Edit Feedback</button>
					</Link>
				) : null}
			</div>

			{/* {feedbacks.length > 0
				? feedbacks.map(feedback => {
						return <FeedbackItem feedback={feedback} key={feedback._id} />;
				  })
				: 'loading'} */}

			{singleFeedback && <FeedbackItem feedback={singleFeedback[0]} />}
			{/* {console.log(singleFeedback)} */}

			<CommentSection feedbackData={singleFeedback[0]} />
		</main>
	);
};

export default Details;
