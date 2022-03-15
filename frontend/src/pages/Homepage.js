import { createContext, useEffect, useState } from 'react';
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
import EmptyFeedback from '../components/EmptyFeedback/EmptyFeedback';

const Homepage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const Context = createContext();

	// get user state from auth redux store
	const { user } = useSelector(state => state.auth);
	const { feedbacks, isLoading, isError, message } = useSelector(state => {
		// console.log(state.feedbacks.feedbacks);
		return state.feedbacks;
	});

	const [categoryState, setCategoryState] = useState('all');
	const getCategoryState = catState => {
		setCategoryState(catState);
	};

	// console.log(feedbacks);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (!user) {
			navigate('/login');
		}

		// dispatch(getFeedbacks(feedbacks));
		setTimeout(() => {
			dispatch(getFeedbacks(feedbacks));
			// console.log('homepage log');
		}, 100);

		// return () => {
		// 	dispatch(reset());
		// };
	}, [user, navigate, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	const filteredFeedbacks = feedbacks.filter(feedback => {
		return feedback.feedbackType.toLowerCase() === categoryState;
	});
	// console.log(categoryState);

	return (
		<main className="Homepage">
			<Dashboard category={getCategoryState} />

			<section className="Homepage__content">
				<Suggestions
					suggestionCount={
						categoryState === 'all'
							? feedbacks.length
							: filteredFeedbacks.length
					}
				/>

				{/* Check for empty feedback lists and render empty component */}
				{feedbacks.length <= 0 ? <EmptyFeedback /> : null}
				{categoryState !== 'all' && filteredFeedbacks.length <= 0 ? (
					<EmptyFeedback />
				) : null}

				{/* Loop over all feedbacks if category state is all, else loop over filtered feedbacks*/}
				{feedbacks.length > 0 && categoryState === 'all' ? (
					<div className="feedbacks">
						{feedbacks.map(feedback => {
							return <FeedbackItem feedback={feedback} key={feedback._id} />;
						})}
					</div>
				) : (
					<div className="feedbacks">
						{filteredFeedbacks.map(feedback => {
							return <FeedbackItem feedback={feedback} key={feedback._id} />;
						})}
					</div>
				)}
			</section>
		</main>
	);
};

export default Homepage;
