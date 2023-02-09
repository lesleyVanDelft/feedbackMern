import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { getFeedbacks } from '../reducers/feedbackReducer';
import Dashboard from '../components/Dashboard/Dashboard';
import FeedbackList from '../components/FeedbackList/FeedbackList';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './Pages.css';
import { logoutUser } from '../reducers/userReducer';

const Homepage = () => {
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const cookie = Cookies.get('jwt');
	// const user = JSON.parse(localStorage.getItem('user'));
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
		}
		if (user === null || cookie === undefined) {
			dispatch(logoutUser());
			navigate('/login');
		} else {
			navigate('/');
			dispatch(getFeedbacks());
		}

		// dispatch(setUser());
	}, [cookie, user]);

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
		</motion.main>
	);
};

export default Homepage;
