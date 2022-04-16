import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFeedback } from '../../features/feedbacks/feedbackSlice';
import { createNewFeedback } from '../../reducers/feedbackReducer';
import CreateImg from '../../assets/shared/icon-new-feedback.svg';
import './CreateFeedbackForm.css';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateFeedbackForm = () => {
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	const [feedbackType, setFeedbackType] = useState('UI');
	const user = useSelector(state => state.user);
	const author = user.id;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const {author
	// 	details
	// 	name
	// 	username
	// 	email} = user;
	// const { id, name, username, email } = user;
	const details = {
		// author: user.id,
		name: user.name,
		username: user.username,
		email: user.email,
	};

	const toastNotify = () =>
		toast.success('Feedback added!', { autoClose: 3000 });

	const onSubmit = e => {
		e.preventDefault();

		dispatch(
			createNewFeedback({
				title,
				text,
				feedbackType,
				author,
				// details,
				status: 'planned',
			})
		);
		setText('');
		setTitle('');
		setFeedbackType('UI');

		navigate('/');
	};
	return (
		<section className="CreateFeedbackForm ">
			<img src={CreateImg} className="CreateFeedbackForm__image" alt="" />
			<h2 className="CreateFeedbackForm__title">Create New Feedback</h2>
			<form onSubmit={onSubmit} className="Form">
				<div className="Form__group">
					<h3>Feedback Title</h3>
					<label htmlFor="title">Add a short, descriptive headline</label>
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="title"
					/>
				</div>
				<div className="Form__group">
					<h3>Category</h3>
					<label htmlFor="feedbackType">
						Choose a category for your feedback
					</label>
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
				<div className="Form__group">
					<h3>Feedback Detail</h3>
					<label htmlFor="text">
						Include any specific comments on what should be improved, added,
						etc.
					</label>
					<textarea
						type="text"
						name="text"
						id="text"
						value={text}
						onChange={e => setText(e.target.value)}
						className="text"
					/>
				</div>

				<div className="Form__group--buttons">
					<Link to="/">
						<button className="btn btn-darkBlue">Cancel</button>
					</Link>
					<button
						className="btn btn-purple"
						type="submit"
						onClick={() => toastNotify()}>
						Add Feedback
					</button>
				</div>
			</form>
		</section>
	);
};

export default CreateFeedbackForm;
