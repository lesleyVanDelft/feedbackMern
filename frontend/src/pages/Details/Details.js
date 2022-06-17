import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleFeedback } from '../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import CommentSection from '../../components/CommentSection/CommentSection';
import { setUser } from '../../reducers/userReducer';
import LogoBar from '../../components/LogoBar/LogoBar';
import {
	toggleUpvoteDetails,
	toggleDownvoteDetails,
} from '../../reducers/feedbackReducer';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.min.css';
import './Details.css';
import PageLogo from '../../components/PageLogo/PageLogo';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';
import Cookies from 'js-cookie';

const Details = () => {
	const singleFeedback = useSelector(state => state.singleFeedback);
	const user = useSelector(state => state.user);
	const cookie = Cookies.get('jwt');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { id } = useParams();

	useEffect(() => {
		// dispatch(getSingleFeedback(id));
		if (user !== null && cookie !== undefined) {
			try {
				// navigate('/');
				dispatch(getSingleFeedback(id));
				dispatch(setUser());
			} catch (error) {
				console.log(error);
			}
		} else {
			navigate('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<>
			{singleFeedback ? (
				<>
					<motion.main
						className="Details"
						variants={initialMotion}
						initial="initial"
						animate="animate">
						<LogoBar />
						<PageLogo />
						<div className="Details__content">
							<div className="Details__content--buttons">
								<BackBtn currentPage="details" />
								{singleFeedback.author === user.id && (
									<Link to={`/edit/${id}`}>
										<button className="btn btn-blue edit">Edit Feedback</button>
									</Link>
								)}
							</div>
							<span className="postedBy">
								Posted by:
								<span className="username">
									@{singleFeedback.details.username}
								</span>
								,{' '}
								{moment(singleFeedback.createdAt).format(
									'dddd, MMMM  Do YYYY, HH:mm:ss'
								)}
							</span>
							<FeedbackItem
								feedback={singleFeedback}
								toggleUpvote={toggleUpvoteDetails}
								toggleDownvote={toggleDownvoteDetails}
								detailsPage={true}
								detailsCount={
									singleFeedback.upvotedBy.length -
									singleFeedback.downvotedBy.length
								}
							/>
							<CommentSection
								comments={singleFeedback.comments}
								feedbackId={id}
								currentFeedback={singleFeedback}
							/>
						</div>
					</motion.main>
				</>
			) : (
				<LoadingSpinner />
			)}
			{/* <ToastContainer /> */}
		</>
	);
};

export default Details;
