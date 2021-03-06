import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewFeedback } from '../../reducers/feedbackReducer';
import CreateImg from '../../assets/shared/icon-new-feedback.svg';
import './CreateFeedbackForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const CreateFeedbackForm = () => {
	const [text, setText] = useState('');
	const [title, setTitle] = useState('');
	// const [feedbackType, setFeedbackType] = useState('UI');
	const [category, setCategory] = useState('Feature');
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
	// get category state from dropdown
	const getCategory = ctg => {
		return setCategory(ctg);
	};

	const onSubmit = e => {
		e.preventDefault();

		dispatch(
			createNewFeedback({
				title,
				text,
				feedbackType: category,
				author,
				details,
				status: 'planned',
			})
		);
		setText('');
		setTitle('');
		setCategory('Feature');

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
					<DropdownMenu category={getCategory} />
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
					<button className="btn btn-purple" type="submit">
						Add Feedback
					</button>
				</div>
			</form>
		</section>
	);
};

export default CreateFeedbackForm;
