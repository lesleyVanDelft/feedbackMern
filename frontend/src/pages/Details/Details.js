import { useEffect } from 'react';
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

// import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
// import Dashboard from '../components/Dashboard/Dashboard';
// import Suggestions from '../components/Suggestions/Suggestions';

const Details = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// let match = useRouteMatch('/:id')
	let { id } = useParams();

	// useSelector(state => console.log(state));
	// get user state from auth redux store
	const { user } = useSelector(state => state.auth);
	const { feedbacks, isLoading, isError, message } = useSelector(state => {
		return state.feedbacks;
	});

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (!user) {
			navigate('/login');
		}

		dispatch(getSingleFeedback(id));

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch, id]);

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
				<button className="btn btn-blue edit">Edit Feedback</button>
			</div>
			{feedbacks.map(feedback => {
				return <FeedbackItem feedback={feedback} key={feedback._id} />;
			})}

			<div className="Details__comments"></div>
		</main>
	);
};

export default Details;
