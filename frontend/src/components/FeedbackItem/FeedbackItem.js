import { useDispatch } from 'react-redux';
import { deleteFeedback } from '../../features/feedbacks/feedbackSlice';
import './FeedbackItem.css';

const FeedbackItem = ({ feedback }) => {
	const dispatch = useDispatch();
	return (
		<div className="feedback">
			<p className="text">{feedback.text}</p>
			<button onClick={() => dispatch(deleteFeedback(feedback._id))}>
				delete me
			</button>
		</div>
	);
};

export default FeedbackItem;
