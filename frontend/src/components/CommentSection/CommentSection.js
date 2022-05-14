import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ comments, feedbackId, currentFeedback }) => {
	const [commentCount, setCommentCount] = useState(0);
	const singleFeedback = useSelector(state => state.singleFeedback);
	const user = useSelector(state => state.user);

	// reduce comments and replies total length
	const totalCommentCount = commentsArray => {
		const commentRepliesLength = commentsArray
			.map(c => c.replies.length)
			.reduce((sum, c) => sum + c, 0);

		return commentsArray.length + commentRepliesLength;
	};

	// sets total comment count
	useEffect(() => {
		singleFeedback &&
			setCommentCount(totalCommentCount(singleFeedback.comments));
	}, [singleFeedback]);

	if (!singleFeedback) {
		return <h1>Loading</h1>;
	}

	if (!comments) {
		return <h2>Loading comments..</h2>;
	}

	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">{commentCount} Comments</h2>
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
