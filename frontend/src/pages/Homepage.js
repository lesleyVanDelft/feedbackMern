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
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Homepage = () => {
	const feedbacks = useSelector(state => state.feedbacks);
	// const user = useSelector(state => state.user);
	const user = JSON.parse(localStorage.getItem('user'));
	const [pageLoading, setPageLoading] = useState(false);
	// const [feedbackData, setFeedbackData] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getFeedbacks());
	// }, []);
	// useEffect(() => {
	// 	try {
	// 		if (user) {
	// 			dispatch(getFeedbacks());
	// 		}
	// 	} catch (err) {
	// 		console.log(err.response);
	// 		console.log('homepage.js');
	// 	}
	// }, [dispatch, user]);

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
		if (!user) {
			// dispatch(setUser());
			Cookies.remove('jwt', { path: '/' });
			navigate('/login');
		}
		if (user) {
			try {
				navigate('/');
				dispatch(getFeedbacks());

				// setTimeout(() => {
				// 	// if (user) {
				// 	// 	dispatch(getFeedbacks());
				// 	// }
				// 	if (!user) {
				// 		navigate('/login');
				// 	}
				// }, 300);
				// if (!user) {
				// 	navigate('/login');
				// }
			} catch (error) {
				console.log(error);
			}
		}

		dispatch(setUser());
	}, []);

	// if (!feedbacks) {
	// 	return <h1>Loading </h1>;
	// }
	const initialMotion = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.5,
				// ease: [0.87, 0, 0.13, 1],
			},
		},
	};
	return (
		<motion.main
			className="Homepage"
			variants={initialMotion}
			initial="initial"
			animate="animate">
			<Dashboard category={getCategoryState} mobileOpen={getMobileState} />

			<section className={`Homepage__content`}>
				{/* mobile animation overlay */}
				{/* <h1>hello</h1> */}
				<motion.div
					className={`overlay ${mobileState ? 'active' : null}`}
					variants={menuVisibility}
					initial="hidden"
					animate="visible"></motion.div>

				{/* <FeedbackList category={categoryState} feedbackData={feedbacks} /> */}
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

// {name: "tester", email: "test@test.nl", username: "tester1", id: "62239c97eb2f4493437026f7",…}
// email: "test@test.nl"
// id: "62239c97eb2f4493437026f7"
// name: "tester"
// profileImg: {exists: false, imageId: "null", imageLink: "null"}
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjM5Yzk3ZWIyZjQ0OTM0MzcwMjZmNyIsInVzZXJuYW1lIjoidGVzdGVyMSIsIm5hbWUiOiJ0ZXN0ZXIiLCJpYXQiOjE2NDk2OTYzMDQsImV4cCI6MTY1MjI4ODMwNH0.Z-q4Hu2a94Kh7tMs31lJnYlifLy6A942nDPpA6NkVvM"
// username: "tester1"
