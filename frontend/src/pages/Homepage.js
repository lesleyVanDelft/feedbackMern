import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { motion } from 'framer-motion';
import { getFeedbacks } from '../reducers/feedbackReducer';
import Dashboard from '../components/Dashboard/Dashboard';
import './Pages.css';
import FeedbackList from '../components/FeedbackList/FeedbackList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Homepage = () => {
	const feedbacks = useSelector(state => state.feedbacks);
	const user = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// category filter button state
	const [categoryState, setCategoryState] = useState('all');
	const getCategoryState = catState => {
		setCategoryState(catState);
	};

	useEffect(() => {
		if (!user) {
			Cookies.remove('jwt', { path: '/' });
			// navigate('/login');
		}
		if (user) {
			try {
				navigate('/');
				dispatch(getFeedbacks());
			} catch (error) {
				console.log(error);
			}
		} else {
			navigate('/login');
		}

		// dispatch(setUser());
	}, []);

	const initialMotion = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};
	return (
		<motion.main
			className="Homepage"
			variants={initialMotion}
			initial="initial"
			animate="animate">
			<Dashboard category={getCategoryState} mobileOpen={null} />

			<section className={`Homepage__content`}>
				{feedbacks ? (
					<FeedbackList category={categoryState} />
				) : (
					<LoadingSpinner />
				)}
			</section>

			<ToastContainer autoClose={2000} />
		</motion.main>
	);
};

export default Homepage;
