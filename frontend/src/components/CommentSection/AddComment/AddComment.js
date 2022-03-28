import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	addComment,
	getSingleFeedback,
} from '../../../features/feedbacks/feedbackSlice';
// import { addComment } from '../../../features/feedbacks/commentSlice';
import { useParams } from 'react-router-dom';
import './AddComment.css';

const AddComment = ({ feedbackData }) => {
	const [commentText, setCommentText] = useState('');
	const [charCount, setCharCount] = useState(250);
	// console.log(feedbackData);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// console.log(user);

	const { id } = useParams();

	const handleChange = e => {
		setCommentText(e.target.value);
		setCharCount(250 - e.target.value.length);
	};
	// console.log(user);
	// button -> dispatch(addComment())
	let data = {
		_id: id,
		text: commentText,
	};

	// token: user.token,
	const onSubmit = e => {
		// const finalComment = `${user.name}: ${commentText}`;
		e.preventDefault();
		dispatch(addComment(data));

		// setTimeout(() => {
		// 	navigate(`/details/${id}`);
		// }, 550);
		navigate('/');
	};

	return (
		<form className="AddComment" id="AddComment" onSubmit={onSubmit}>
			<h2 className="AddComment__title">Add Comment</h2>
			<textarea
				type="text"
				value={commentText}
				maxLength={250}
				form={'AddComment'}
				onChange={e => handleChange(e)}
				placeholder="Type your comment here"
			/>
			<div className="AddComment__bottom">
				<span className="letterCount">{charCount} characters left</span>
				<button type="submit" className="btn btn-purple">
					Post Comment
				</button>
			</div>
		</form>
	);
};

export default AddComment;
