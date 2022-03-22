import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleFeedback } from '../../features/feedbacks/feedbackSlice';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ feedbackData }) => {
	// const [comments, setComments] = useState([]);
	// const { comments } = feedbackData.comments;
	// console.log(comments);
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getSingleFeedback(feedbackData[0]._id));
	// 	// setComments(feedbackData[0].comments);
	// }, [feed]);
	// console.log(feedbackData[0]);
	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">
				{feedbackData.comments.length} Comments
			</h2>
			<div className="CommentSection__comments">
				{feedbackData.comments.map((com, i) => {
					return <Comment commentData={com} key={i} />;
				})}
			</div>
			<AddComment feedbackData={feedbackData} />
		</section>
	);
};

export default CommentSection;
