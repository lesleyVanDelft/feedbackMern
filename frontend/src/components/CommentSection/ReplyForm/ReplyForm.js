import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { ReplyContext } from '../Comment/Comment';
import { addReply } from '../../../reducers/feedbackCommentsReducer';
import './ReplyForm.css';

const ReplyForm = ({ currentFeedback, comment }) => {
	const [replyBody, setReplyBody] = useState('');
	const dispatch = useDispatch();
	// console.log(replyBody);

	const handleSubmit = e => {
		e.preventDefault();
		// console.log('HELLOOOOOO 🤭');
		dispatch(addReply(currentFeedback._id, comment._id, replyBody));
	};

	const handleChange = e => {
		setReplyBody(e.target.value);
	};

	return (
		<form className="ReplyForm" onSubmit={handleSubmit}>
			<textarea
				name="reply"
				id="reply"
				rows="5"
				// cols="55"
				maxLength={250}
				className="ReplyForm__textarea"
				onChange={e => handleChange(e)}
			/>
			<button className="btn btn-purple" type="submit">
				Post Reply
			</button>
		</form>
	);
};

export default ReplyForm;
