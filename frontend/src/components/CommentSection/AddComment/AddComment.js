import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { addComment } from '../../../features/feedbacks/commentSlice';
import { addComment } from '../../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import './AddComment.css';

const AddComment = ({ feedbackData }) => {
	const [comment, setComment] = useState('');
	const [charCount, setCharCount] = useState(250);
	// console.log(feedbackData);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// console.log(user);

	const { id } = useParams();

	const handleChange = e => {
		setComment(e.target.value);
		setCharCount(250 - e.target.value.length);
	};
	// console.log(user);
	// button -> dispatch(addComment())
	let data = {
		_id: id,
		comment: comment,
	};

	// token: user.token,
	const onSubmit = e => {
		// const finalComment = `${user.name}: ${comment}`;
		e.preventDefault();
		dispatch(addComment(user.id, data));
		setComment('');
		// setTimeout(() => {
		// 	navigate(`/details/${id}`);
		// }, 550);
		// navigate('/');
	};

	return (
		<form className="AddComment" id="AddComment" onSubmit={onSubmit}>
			<h2 className="AddComment__title">Add Comment</h2>
			<textarea
				type="text"
				value={comment}
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
