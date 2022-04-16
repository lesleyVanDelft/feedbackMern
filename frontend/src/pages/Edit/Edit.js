import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import Spinner from '../../components/Spinner';
import {
	getSingleFeedback,
	reset,
} from '../../features/feedbacks/feedbackSlice';
import { useParams } from 'react-router-dom';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import './Edit.css';
import CommentSection from '../../components/CommentSection/CommentSection';
import EditFeedbackForm from '../../components/EditFeedbackForm/EditFeedbackForm';
import { getFeedbackComments } from '../../reducers/feedbackCommentsReducer';
import LogoBar from '../../components/LogoBar/LogoBar';

const Edit = () => {
	const user = useSelector(state => state.user);
	const singleFeedback = useSelector(state => state.singleFeedback);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { id } = useParams();

	if (!singleFeedback) {
		return <h2>Loading</h2>;
	}

	return (
		<>
			<LogoBar />
			<section className="Edit">
				<div className="Edit__backButton">
					<button className="back">
						<Link to="/">
							<FaChevronLeft /> <span>Go Back</span>
						</Link>
					</button>
				</div>
				<EditFeedbackForm feedbackData={singleFeedback} />
			</section>
		</>
	);
};

export default Edit;
