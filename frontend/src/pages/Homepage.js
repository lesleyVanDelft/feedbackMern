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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Homepage = () => {
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const [pageLoading, setPageLoading] = useState(false);
	// const [feedbackData, setFeedbackData] = useState([]);
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

	useEffect(() => {
		// console.log(Cookies.get('jwt'));
		if (user) {
			dispatch(getFeedbacks());
		}
		// if (!user) {
		// 	navigate('/login');
		// }
		setTimeout(() => {
			// if (user) {
			// 	dispatch(getFeedbacks());
			// }
			if (!user) {
				navigate('/login');
			}
		}, 200);
	}, []);

	if (!feedbacks) {
		return <h1>Loading </h1>;
	}
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

				{/* <FeedbackList category={categoryState} feedbackData={feedbacks} /> */}
				<FeedbackList category={categoryState} />
			</section>

			<ToastContainer autoClose={2000} />
		</main>
	);
};

export default Homepage;
