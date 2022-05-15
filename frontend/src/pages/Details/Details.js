import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import { getSingleFeedback } from '../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import CommentSection from '../../components/CommentSection/CommentSection';
import { setUser } from '../../reducers/userReducer';
import LogoBar from '../../components/LogoBar/LogoBar';
import {
	toggleUpvoteDetails,
	toggleDownvoteDetails,
} from '../../reducers/feedbackCommentsReducer';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.min.css';
import './Details.css';
import PageLogo from '../../components/PageLogo/PageLogo';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';

const Details = () => {
	const singleFeedback = useSelector(state => state.singleFeedback);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	let { id } = useParams();

	useEffect(() => {
		dispatch(getSingleFeedback(id));
		dispatch(setUser());
	}, [dispatch, id]);

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
								{/* <button className="back">
									<Link to="/">
										<FaChevronLeft /> <span>Go Back</span>
									</Link>
								</button> */}
								{/* <Link to="/"> */}
								<BackBtn currentPage="details" />
								{/* </Link> */}
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
			<ToastContainer />
		</>
	);
};

export default Details;
