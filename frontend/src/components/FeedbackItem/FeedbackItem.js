// import { useDispatch } from 'react-redux';
// import { deleteFeedback } from '../../features/feedbacks/feedbackSlice';
import { motion } from 'framer-motion';
import { FaChevronUp, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FeedbackItem.css';

const FeedbackItem = ({ feedback, index }) => {
	const framerList = {
		initial: {
			opacity: 0,
			translateX: -40,
		},
		animate: {
			opacity: 1,
			translateX: 0,
		},
		transition: {
			duration: 0.3,
			delay: index ? index * 0.1 : 0,
		},
	};

	return (
		<motion.div
			initial={framerList.initial}
			animate={framerList.animate}
			transition={framerList.transition}
			className="FeedbackItem">
			<div className="FeedbackItem__left">
				<div className="FeedbackItem__left--voteBtn">
					<button className="votes">
						<FaChevronUp className="chevronUp" />
						<span>0</span>
					</button>
				</div>
				<div className="FeedbackItem__left--content">
					<Link to={`/details/${feedback._id}`}>
						<h3 className="title">{feedback.title}</h3>
					</Link>
					<p className="text">{feedback.text}</p>
					<button className="feedbackTypeBtn">{feedback.feedbackType}</button>
				</div>
			</div>

			<div className="FeedbackItem__right">
				<FaComment className="commentIcon" />
				<span className="commentLength">
					<Link to={`/details/${feedback._id}`}>
						{feedback.comments.length > 0 ? feedback.comments.length : 0}
					</Link>
				</span>
			</div>

			{/* <p className="FeedbackItem__text">{feedback.feedbackType}</p> */}
			{/* <button onClick={() => dispatch(deleteFeedback(feedback._id))}>
				delete me
			</button> */}
		</motion.div>
	);
};

export default FeedbackItem;
