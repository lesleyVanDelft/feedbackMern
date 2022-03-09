import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createFeedback } from '../../features/feedbacks/feedbackSlice';

const FeedbackForm = () => {
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const [feedbackType, setFeedbackType] = useState('UI');
	const dispatch = useDispatch();

	const onSubmit = e => {
		e.preventDefault();

		dispatch(createFeedback({ title, text, feedbackType }));
		setText('');
		setTitle('');
		setFeedbackType('UI');
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
					<label htmlFor="feedbackType">feedbackType</label>
					<select
						name="feedbackType"
						id="feedbackType"
						value={feedbackType}
						onChange={e => setFeedbackType(e.target.value)}>
						<option value="UI">UI</option>
						<option value="UX">UX</option>
						<option value="Enhancement">Enhancement</option>
						<option value="Bug">Bug</option>
						<option value="Feature">Feature</option>
					</select>
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
