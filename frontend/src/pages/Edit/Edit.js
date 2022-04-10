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
	// get user state from auth redux store
	// const { user } = useSelector(state => state.auth);
	// const { feedbacks, isLoading, isError, message } = useSelector(state => {
	// 	return state.feedbacks;
	// });
	// const [currentTitle, setCurrentTitle] = useState(feedbacks[0].title);
	// const [currentFeedbackType, setCurrentFeedbackType] = useState(
	// 	feedbacks[0].feedbackType
	// );
	// const [currentText, setCurrentText] = useState(feedbacks[0].text);
	const user = useSelector(state => state.user);
	const feedback = useSelector(state => state.feedbackComments);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	let { id } = useParams();

	// useEffect(() => {
	// 	dispatch(getFeedbackComments(id));
	// }, []);

	// useEffect(() => {
	// 	if (isError) {
	// 		console.log(message);
	// 	}

	// 	if (!user) {
	// 		navigate('/login');
	// 	}
	// 	if (isLoading) {
	// 		return <Spinner />;
	// 	}

	// 	// dispatch(getSingleFeedback(id));

	// 	// return () => {
	// 	// 	dispatch(reset());
	// 	// };
	// }, [id]);

	if (!feedback) {
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
				<EditFeedbackForm feedbackData={feedback} />
			</section>
		</>
	);
};

export default Edit;
