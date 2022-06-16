import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import './AddComment.css';

const AddComment = ({ feedbackData, user }) => {
	const [comment, setComment] = useState('');
	const [charCount, setCharCount] = useState(250);
	const dispatch = useDispatch();
	// console.log(user);

	const { id } = useParams();

	const handleChange = e => {
		setComment(e.target.value);
		setCharCount(250 - e.target.value.length);
	};

	let data = {
		_id: id,
		comment: comment,
		profileImg: user.profileImg,
	};

	const onSubmit = e => {
		e.preventDefault();
		dispatch(addComment(id, data));
		setComment('');
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
