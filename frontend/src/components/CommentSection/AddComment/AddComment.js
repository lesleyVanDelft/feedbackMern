import { useState } from 'react';
import './AddComment.css';

const AddComment = () => {
	const [commentText, setCommentText] = useState('');

	return (
		<form className="AddComment">
			<h2 className="AddComment__title">Add Comment</h2>
			<input
				type="text"
				value={commentText}
				onChange={e => setCommentText(e.target.value)}
				placeholder="Type your comment here"
			/>
			<div className="AddComment__bottom">
				<span className="letterCount">250 characters left</span>
				<button type="submit" className="btn btn-purple">
					Post Comment
				</button>
			</div>
		</form>
	);
};

export default AddComment;
