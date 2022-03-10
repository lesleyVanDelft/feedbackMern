import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import GoalForm from '../components/GoalForm';
// import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import Spinner from '../components/Spinner';
import { getFeedbacks, reset } from '../features/feedbacks/feedbackSlice';
import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
import Dashboard from '../components/Dashboard/Dashboard';
import Suggestions from '../components/Suggestions/Suggestions';
import './Pages.css';

const Homepage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const Context = createContext();

	// get user state from auth redux store
	const { user } = useSelector(state => state.auth);
	const { feedbacks, isLoading, isError, message } = useSelector(state => {
		console.log(state.feedbacks.feedbacks);
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
			{/* <FeedbackForm /> */}
			<Dashboard />

			<section className="Homepage__content">
				<Suggestions suggestionCount={feedbacks.length} />

				{feedbacks.length > 0 ? (
					<div className="feedbacks">
						{feedbacks.map(feedback => {
							// console.log(feedback);
							let value = feedback;
							return (
								<Context.Provider value={value} key={feedback._id}>
									<FeedbackItem feedback={feedback} />
								</Context.Provider>
							);
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
