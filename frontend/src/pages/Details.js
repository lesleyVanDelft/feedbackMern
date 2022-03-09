import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import GoalForm from '../components/GoalForm';
// import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import Spinner from '../components/Spinner';
import { getSingleFeedback, reset } from '../features/feedbacks/feedbackSlice';
import { useRouteMatch, useParams } from 'react-router-dom';
import FeedbackItem from '../components/FeedbackItem/FeedbackItem';

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
		console.log(state);
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
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h1>details</h1>
			{feedbacks.map((fb, i) => {
				return <FeedbackItem feedback={fb} />;
			})}
		</>
	);
};

export default Details;
