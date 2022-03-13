import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditImg from '../../assets/shared/icon-edit-feedback.svg';
// import Spinner from '../Spinner';
import {
	// getSingleFeedback,
	// reset,
	editFeedback,
	deleteFeedback,
	getSingleFeedback,
} from '../../features/feedbacks/feedbackSlice';
import { useParams } from 'react-router-dom';
// import { FaChevronLeft } from 'react-icons/fa';
import './EditFeedbackForm.css';

// 01:25 11-3-2022, needs edit form and functionality. Create button gives errors ._.' nvm fixed it, somehow got removed from app.js routes -.-

const EditFeedbackForm = ({ feedbackData }) => {
	const [titleContent, setTitleContent] = useState('');
	const [category, setCategory] = useState('');
	const [detailContent, setDetailContent] = useState('');
	// console.log(feedbackData);
	// console.log(titleContent);

	// get user state from auth redux store
	const { user } = useSelector(state => state.auth);
	const { feedbacks } = useSelector(state => {
		return state.feedbacks;
	});
	// console.log(feedbacks);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { id } = useParams();

	// let data = {};
	useEffect(() => {
		// const { title, feedbackType, text } = feedbackData[0];
		// console.log(title, feedbackType, text);
		// dispatch()
		setTitleContent(feedbacks[0].title);
		setCategory(feedbacks[0].feedbackType);
		setDetailContent(feedbacks[0].text);
		// console.log(id);
	}, []);

	// console.log(data);
	// _id: id.toString(),
	let data = {
		_id: id,
		title: titleContent,
		feedbackType: category,
		text: detailContent,
	};

	const onSubmit = e => {
		e.preventDefault();
		dispatch(editFeedback(data));
	};

	return (
		<section className="EditFeedbackForm">
			<img src={EditImg} alt="" className="EditFeedbackForm__image" />
			<h2 className="EditFeedbackForm__title">
				Editing '{feedbackData.length > 0 ? feedbackData[0].title : null}'
			</h2>
			<form className="Form" onSubmit={onSubmit}>
				<div className="Form__group">
					<h3>Feedback Title</h3>
					<label htmlFor="title">Add a short, descriptive headline</label>
					<input
						type="text"
						name="title"
						id="title"
						value={titleContent}
						onChange={e => setTitleContent(e.target.value)}
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
						value={category}
						onChange={e => setCategory(e.target.value)}>
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
					<input
						type="text"
						name="text"
						id="text"
						value={detailContent}
						onChange={e => setDetailContent(e.target.value)}
						className="text"
					/>
				</div>

				<div className="Form__group--buttons">
					<button
						className="btn btn-red"
						onClick={() => dispatch(deleteFeedback(id))}>
						Delete
					</button>
					<button className="btn btn-darkBlue" onClick={() => navigate('/')}>
						Cancel
					</button>
					<button className="btn btn-purple" type="submit">
						Add Changes
					</button>
				</div>
			</form>
		</section>
	);
};

export default EditFeedbackForm;
