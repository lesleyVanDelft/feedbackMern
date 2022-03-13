import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getSingleFeedback } from '../../features/feedbacks/feedbackSlice';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ feedbackData }) => {
	// const [comments, setComments] = useState([]);
	// const { comments } = feedbackData.comments;
	// console.log(comments);
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	// dispatch(getSingleFeedback(feedbackData));
	// 	setComments(feedbackData[0].comments);
	// }, [feedbackData]);
	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">
				{feedbackData[0].comments.length} Comments
			</h2>
			<div className="CommentSection__comments">
				{feedbackData[0].comments.map((com, i) => {
					return <Comment commentData={com} key={i} />;
				})}
			</div>
			<AddComment />
		</section>
	);
};

export default CommentSection;
