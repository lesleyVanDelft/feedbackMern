import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import GoalForm from '../components/GoalForm';
import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import Spinner from '../components/Spinner';
import { getFeedbacks, reset } from '../features/feedbacks/feedbackSlice';
import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
import Dashboard from '../components/Dashboard/Dashboard';
import Suggestions from '../components/Suggestions/Suggestions';
import './Pages.css';

const Homepage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

		dispatch(getFeedbacks());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<main className="Homepage">
			{/* <section className="Homepage__heading">
				<h1>{user && user.name}</h1>
				<h5>{user && user.username}</h5>
				<p>Goals Dashboards</p>
			</section> */}
			{/* <FeedbackForm /> */}
			<Dashboard />

			<section className="Homepage__content">
				<Suggestions />
				{feedbacks.length > 0 ? (
					<div className="feedbacks">
						{feedbacks.map(feedback => {
							return <FeedbackItem key={feedback._id} feedback={feedback} />;
						})}
					</div>
				) : (
					<h3>You have not set any feedbacks</h3>
				)}
			</section>
		</main>
	);
};

export default Homepage;
