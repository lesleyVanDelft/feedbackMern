import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditImg from '../../assets/shared/icon-edit-feedback.svg';
import {
	updateFeedback,
	removeFeedback,
} from '../../reducers/feedbackCommentsReducer';
import { useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditFeedbackForm.css';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const EditFeedbackForm = () => {
	const [titleContent, setTitleContent] = useState('');
	const [category, setCategory] = useState('');
	const [detailContent, setDetailContent] = useState('');
	const [showModal, setShowModal] = useState(false);
	const singleFeedback = useSelector(state => state.singleFeedback);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { id } = useParams();

	useEffect(() => {
		setTitleContent(singleFeedback.title);
		setCategory(singleFeedback.feedbackType);
		setDetailContent(singleFeedback.text);
	}, []);

	let data = {
		title: titleContent,
		feedbackType: category,
		text: detailContent,
	};

	// Submit edit form
	const onSubmit = e => {
		e.preventDefault();
		dispatch(updateFeedback(id, data));
	};

	const openModal = e => {
		e.preventDefault();
		setShowModal(true);
	};
	const closeModal = e => {
		e.preventDefault();
		setShowModal(false);
	};

	// Delete feedback - edit form
	const handleDelete = e => {
		e.preventDefault();
		dispatch(removeFeedback(id));
		setShowModal(false);
		navigate('/');
	};

	// get category state from dropdown
	const getCategory = ctg => {
		return setCategory(ctg);
	};
	// Cancel edit
	const handleCancel = () => {
		navigate('/');
	};

	if (!singleFeedback) {
		return <h2>Loading</h2>;
	}

	return (
		<section className="EditFeedbackForm">
			<img src={EditImg} alt="" className="EditFeedbackForm__image" />
			<h2 className="EditFeedbackForm__title">
				Editing '{singleFeedback && singleFeedback.title}'
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

					<DropdownMenu className="dropdown" category={getCategory} />
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

				<Modal
					active={showModal}
					closeModal={closeModal}
					feedback={singleFeedback}
					handleDelete={handleDelete}
				/>

				<div className="Form__group--buttons">
					<button className="btn btn-red" type="button" onClick={openModal}>
						Delete
					</button>
					<button
						className="btn btn-darkBlue"
						type="button"
						onClick={handleCancel}>
						Cancel
					</button>
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
