import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import EditImg from '../../assets/shared/icon-edit-feedback.svg';
import { toast } from 'react-toastify';
// import {
// 	// getSingleFeedback,
// 	reset,
// 	editFeedback,
// 	deleteFeedback,
// 	getSingleFeedback,
// } from '../../features/feedbacks/feedbackSlice';
import { updateFeedback } from '../../reducers/feedbackCommentsReducer';
import { removeFeedback } from '../../reducers/feedbackReducer';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditFeedbackForm.css';

// 01:25 11-3-2022, needs edit form and functionality. Create button gives errors ._.' nvm fixed it, somehow got removed from app.js routes -.-

const EditFeedbackForm = ({ feedbackData }) => {
	const [titleContent, setTitleContent] = useState('');
	const [category, setCategory] = useState('');
	const [detailContent, setDetailContent] = useState('');

	// get user state from auth redux store
	const user = useSelector(state => state.user);
	// const feedback = useSelector(state => state.feedbackComments);
	// const feedbacks  = useSelector(state => {
	// 	return state.feedbacks;
	// });
	// console.log(feedbacks);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { id } = useParams();

	// let data = {};
	useEffect(() => {
		setTitleContent(feedbackData.title);
		setCategory(feedbackData.feedbackType);
		setDetailContent(feedbackData.text);
	}, []);

	let data = {
		title: titleContent,
		feedbackType: category,
		text: detailContent,
	};

	const onSubmit = e => {
		e.preventDefault();
		dispatch(updateFeedback(id, data));
	};

	const handleDelete = () => {
		// e.preventDefault();
		dispatch(removeFeedback(id));
		// setTimeout(navigate('/'), 1000);
		// dispatch(reset());
		// navigate('/');

		// dispatch(feedbackData)
		// console.log(feedbackData);
		toast('Deleted?');
	};
	const CloseButton = ({ closeToast }) => (
		<i className="material-icons" onClick={closeToast}>
			deleted
		</i>
	);

	if (!feedbackData) {
		return <h2>Loading</h2>;
	}

	return (
		<section className="EditFeedbackForm">
			<img src={EditImg} alt="" className="EditFeedbackForm__image" />
			<h2 className="EditFeedbackForm__title">
				Editing '{feedbackData && feedbackData.title}'
			</h2>
			<form className="Form" id="FormEdit" onSubmit={onSubmit}>
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
					<textarea
						type="text"
						name="text"
						id="text"
						rows={3}
						value={detailContent}
						onChange={e => setDetailContent(e.target.value)}
						className="text"
					/>
				</div>

				<div className="Form__group--buttons">
					<Link to="/">
						<button
							className="btn btn-red"
							type="button"
							onClick={() => {
								handleDelete();
							}}>
							Delete
						</button>
					</Link>
					<Link to="/">
						<button className="btn btn-darkBlue" type="button" onClick={null}>
							Cancel
						</button>
					</Link>
					<button className="btn btn-purple" type="submit">
						Add Changes
					</button>
				</div>
			</form>
			<ToastContainer autoClose={2000} />
		</section>
	);
};

export default EditFeedbackForm;
