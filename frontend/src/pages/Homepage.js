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

	// framer motion
	const menuVisibility = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	};

	useEffect(() => {
		dispatch(getFeedbacks(feedbacks));
		setTimeout(() => {
			dispatch(getFeedbacks(feedbacks));
			// console.log('homepage log');
		}, 100);
		if (isLoading) {
			return <Spinner />;
		}

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

	// framer motion
	const framerList = {
		initial: {
			opacity: 0,
			translateX: -50,
		},
		animate: {
			opacity: 1,
			translateX: 0,
		},
	};
	// const initial = {
	// 	opacity: 0,
	// 	translateX: -50,
	// };
	// const framerAnimate = {
	// 	opacity: 1,
	// 	translateX: 0,
	// };
	// const framerContainer = {
	// 	hidden: { opacity: 0 },
	// 	show: {
	// 	  opacity: 1,
	// 	  transition: {
	// 		staggerChildren: 2.5
	// 	  }
	// 	}
	//   };

	// const filteredFeedbacks = [];
	const filteredFeedbacks =
		feedbacks.length > 0 &&
		feedbacks.filter(feedback => {
			return feedback.feedbackType.toLowerCase() === categoryState;
		});
	// <Dashboard category={getCategoryState} mobileOpen={getMobileState} />;

	// const feedbackList = feedbacks.map();
	return (
		<main className="Homepage">
			<Dashboard category={getCategoryState} mobileOpen={getMobileState} />

			<section className={`Homepage__content`}>
				{/* mobile animation overlay */}
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
						<motion.div className="feedbacks">
							{feedbacks.map((feedback, i) => {
								return (
									<FeedbackItem
										feedback={feedback}
										key={feedback._id}
										index={i}
									/>
								);
							})}
						</motion.div>
					) : (
						<div className="feedbacks">
							{filteredFeedbacks.length > 0 &&
								filteredFeedbacks.map((feedback, i) => {
									return (
										<FeedbackItem
											feedback={feedback}
											key={feedback._id}
											index={i}
										/>
									);
								})}
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

export default Homepage;
