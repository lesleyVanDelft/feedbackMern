import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ comments, feedbackId, currentFeedback }) => {
	const [commentCount, setCommentCount] = useState(0);
	const [commentList, setCommentList] = useState(comments);
	const singleFeedback = useSelector(state => state.singleFeedback);
	const user = useSelector(state => state.user);

	// NPM React query, check if user is on mobile
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	// reduce comments and replies total length
	const totalCommentCount = commentsArray => {
		const commentRepliesLength = commentsArray
			.map(c => c.replies.length)
			.reduce((sum, c) => sum + c, 0);

		return commentsArray.length + commentRepliesLength;
	};

	// set comment list
	useEffect(() => {
		setCommentList(comments);
	}, [comments]);

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
				{commentList.comments.map((comment, i) => {
					return (
						<Comment
							commentData={comment}
							currentFeedback={currentFeedback}
							key={i}
							user={user}
							username={comment.username}
							isMobile={isMobile}
						/>
					);
				})}
			</div>
			<AddComment singleFeedback={currentFeedback} user={user} />
		</section>
	);
};

export default CommentSection;
