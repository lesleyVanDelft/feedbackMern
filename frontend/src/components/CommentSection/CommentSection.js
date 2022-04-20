import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ comments, feedbackId, currentFeedback }) => {
	const [commentList, setCommentList] = useState();
	const [replies, setReplies] = useState([]);
	const [commentCount, setCommentCount] = useState(0);
	const singleFeedback = useSelector(state => state.singleFeedback);
	const user = useSelector(state => state.user);
	console.log(comments);

	if (!singleFeedback) {
		return <h1>Loading</h1>;
	}

	if (!comments) {
		return <h2>Loading comments..</h2>;
	}
	let count = 0;

	return (
		// <section className="CommentSection">
		// 	<h2 className="CommentSection__count">
		// 		{feedbackComments.commentCount} Comments</h2>
		<section className="CommentSection">
			<h2 className="CommentSection__count">
				{/* {currentFeedback.commentCount} Comments */}
				{singleFeedback.commentCount} Comments
			</h2>
			<div className="CommentSection__comments">
				{singleFeedback.comments.map((comment, i) => {
					return (
						<Comment
							commentData={comment}
							currentFeedback={currentFeedback}
							key={i}
							user={user}
							username={comment.username}
						/>
					);
				})}
			</div>
			<AddComment singleFeedback={currentFeedback} user={user} />
		</section>
	);
};

export default CommentSection;
