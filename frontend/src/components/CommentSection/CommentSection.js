import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSingleFeedback } from '../../features/feedbacks/feedbackSlice';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ comments, feedbackId }) => {
	// const [commentData, setCommentData] = useState()
	const singleFeedback = useSelector(state => state.singleFeedback);
	const user = useSelector(state => state.user);
	// console.log(singleFeedback);

	if (!comments) {
		return <h2>Loading comments..</h2>;
	}

	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">
				{singleFeedback.commentCount} Comments
			</h2>
			<div className="CommentSection__comments">
				{comments.map((comment, i) => {
					return (
						<Comment
							commentData={comment}
							currentFeedback={singleFeedback}
							key={i}
							user={user}
							username={comment.username}
						/>
					);
				})}
			</div>
			<AddComment singleFeedback={singleFeedback} user={user} />
		</section>
	);
};

export default CommentSection;
