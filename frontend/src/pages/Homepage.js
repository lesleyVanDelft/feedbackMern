import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
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
		// console.log(state.feedbacks);
		return state.feedbacks;
	});

	// category filter button state
	const [categoryState, setCategoryState] = useState('all');
	const getCategoryState = catState => {
		setCategoryState(catState);
	};

	// mobile menu open or closed, needed for darkened modal
	const [mobileState, setMobileState] = useState(false);
	const getMobileState = mobile => {
		setMobileState(!mobile);
	};
	// console.log(mobileState);

	const menuVisibility = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	};

	// const localToken = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		dispatch(getFeedbacks(feedbacks));
		setTimeout(() => {
			dispatch(getFeedbacks(feedbacks));
			// console.log('homepage log');
		}, 100);

		if (isError) {
			console.log(message);
		}

		// console.log(localToken.token);

		if (!user) {
			navigate('/login');
		}

		// return () => {
		// 	dispatch(reset());
		// };
	}, [navigate, dispatch, isError, message]);
	// console.log(feedbacks);
	if (isLoading) {
		return <Spinner />;
	}

	const filteredFeedbacks =
		feedbacks.length > 0 &&
		feedbacks.filter(feedback => {
			return feedback.feedbackType.toLowerCase() === categoryState;
		});
	// const filteredFeedbacks = [];
	<Dashboard category={getCategoryState} mobileOpen={getMobileState} />;
	return (
		<main className="Homepage">
			<Dashboard category={getCategoryState} mobileOpen={getMobileState} />

			<section className={`Homepage__content`}>
				<motion.div
					className={`overlay ${mobileState ? 'active' : null}`}
					variants={menuVisibility}
					initial="hidden"
					animate="visible"></motion.div>
				<Suggestions
					suggestionCount={
						categoryState === 'all'
							? feedbacks.length
							: filteredFeedbacks.length
					}
				/>

				{/* Check for empty feedback lists and render empty component */}
				<div className="Homepage__content--feedbacks">
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
							{filteredFeedbacks.length > 0 &&
								filteredFeedbacks.map(feedback => {
									return (
										<FeedbackItem feedback={feedback} key={feedback._id} />
									);
								})}
						</div>
						// <h3>no shit</h3>
					)}
				</div>
			</section>
		</main>
	);
};

export default Homepage;
