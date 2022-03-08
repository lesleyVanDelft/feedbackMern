import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFeedback } from '../../features/feedbacks/feedbackSlice';

const FeedbackForm = () => {
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const dispatch = useDispatch();

	const onSubmit = e => {
		e.preventDefault();

		dispatch(createFeedback({ title, text }));
		setText('');
	};
	return (
		<section className="form">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="text">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="text">Goal</label>
					<input
						type="text"
						name="text"
						id="text"
						value={text}
						onChange={e => setText(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<button className="btn btn-block" type="submit">
						Add Goal
					</button>
				</div>
			</form>
		</section>
	);
};

export default FeedbackForm;
