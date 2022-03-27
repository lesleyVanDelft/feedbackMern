import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { motion, AnimatePresence } from 'framer-motion';
// import GoalForm from '../components/GoalForm';
// import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import Spinner from '../components/Spinner';
// import { getFeedbacks, reset } from '../features/feedbacks/feedbackSlice';
import { getFeedbacks } from '../reducers/feedbackReducer';
import FeedbackItem from '../components/FeedbackItem/FeedbackItem';
import Dashboard from '../components/Dashboard/Dashboard';
import Suggestions from '../components/Suggestions/Suggestions';
import './Pages.css';
import EmptyFeedback from '../components/EmptyFeedback/EmptyFeedback';
import FeedbackList from '../components/FeedbackList/FeedbackList';

const Homepage = () => {
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const [pageLoading, setPageLoading] = useState(false);
	const [feedbackData, setFeedbackData] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	// useEffect(() => {

	// }, [dispatch, user]);

	useEffect(() => {
		if (user) {
			dispatch(getFeedbacks());
		}
		setTimeout(() => {
			if (!user) {
				navigate('/login');
			}
		}, 200);
	}, []);

	// const filteredFeedbacks = [];
	// const filteredFeedbacks =
	// 	feedbacks.length > 0 &&
	// 	feedbacks.filter(feedback => {
	// 		return feedback.feedbackType.toLowerCase() === categoryState;
	// 	});
	// <Dashboard category={getCategoryState} mobileOpen={getMobileState} />;

	// const feedbackList = feedbacks.map();
	// const handleCategoryChange = async () => {
	// 	try {

	// 	} catch (error) {

	// 	}
	// }
	// const filteredFeedbacks = () => {};
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

				{/* <Suggestions suggestionCount={feedbacks && feedbacks.length} /> */}
				{/* <Suggestions
					suggestionCount={
						categoryState === 'all'
							? feedbacks.length
							: filteredFeedbacks.length
					}
				/> */}

				{/* <FeedbackList category={categoryState} feedbackData={feedbacks} /> */}
				<FeedbackList category={categoryState} />

				{/* Check for empty feedback lists and render empty component */}
				{/* <div className="Homepage__content--feedbacks">
					{feedbacks.length <= 0 ? <EmptyFeedback /> : null}
					{categoryState !== 'all' && filteredFeedbacks.length <= 0 ? (
						<EmptyFeedback />
					) : null} */}

				{/* Loop over all feedbacks if category state is all, else loop over filtered feedbacks*/}
				{/* {feedbacks.length > 0 && categoryState === 'all' ? (
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
				</div> */}
			</section>
		</main>
	);
};

export default Homepage;
