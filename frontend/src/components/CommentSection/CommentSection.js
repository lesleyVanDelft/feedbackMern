import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSingleFeedback } from '../../features/feedbacks/feedbackSlice';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

<<<<<<< HEAD
const CommentSection = ({ feedbackData }) => {
	// const [comments, setComments] = useState([]);
	const [feedback, setFeedback] = useState([]);
	// const { comments } = feedbackData.comments;
	// console.log(comments);
	// const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(getSingleFeedback(feedbackData));
		setFeedback(feedbackData[0]);
	}, []);
	console.log(feedback);
=======
const CommentSection = ({ comments, feedbackId }) => {
	// const [commentData, setCommentData] = useState()
	const feedbackComments = useSelector(state => state.feedbackComments);
	const user = useSelector(state => state.user);
	// console.log(feedbackComments);

	if (!comments) {
		return <h2>Loading</h2>;
	}

	// useEffect(() => {
	// 	setCommentData()
	// }, [])
>>>>>>> toolkittesting
	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">
				{feedbackComments.commentCount} Comments
			</h2>
			<div className="CommentSection__comments">
				{comments.map((comment, i) => {
					return (
						<Comment
							commentData={comment}
							currentFeedback={feedbackComments}
							key={i}
							user={user}
						/>
					);
					// return comment.replies.length > 0 ? '' : null
				})}
			</div>
			<AddComment feedbackComments={feedbackComments} user={user} />
			{/* {console.log(feedbackComments.comments)} */}

			{/* {feedbackComments.comments.map((comment) => {

			})} */}
		</section>
	);
};

export default CommentSection;
