import { useDispatch } from 'react-redux';
import { deleteFeedback } from '../../features/feedbacks/feedbackSlice';
import { FaChevronUp, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FeedbackItem.css';

const FeedbackItem = ({ feedback }) => {
	const dispatch = useDispatch();
	return (
		<div className="FeedbackItem">
			<div className="FeedbackItem__left">
				<div className="FeedbackItem__left--voteBtn">
					<button className="votes">
						<FaChevronUp className="chevronUp" />
						<span>0</span>
					</button>
				</div>
				<div className="FeedbackItem__left--content">
					<Link to={`/${feedback._id}`}>
						<h3 className="title">{feedback.title}</h3>
					</Link>
					<p className="text">{feedback.text}</p>
					<button className="feedbackTypeBtn">{feedback.feedbackType}</button>
				</div>
			</div>

			<div className="FeedbackItem__right">
				<FaComment className="commentIcon" />
				<span className="commentLength">{feedback.comments.length}</span>
			</div>

			{/* <p className="FeedbackItem__text">{feedback.feedbackType}</p> */}
			{/* <button onClick={() => dispatch(deleteFeedback(feedback._id))}>
				delete me
			</button> */}
		</div>
	);
};

export default FeedbackItem;
