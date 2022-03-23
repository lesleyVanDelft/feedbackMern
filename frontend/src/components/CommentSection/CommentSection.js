import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleFeedback } from '../../features/feedbacks/feedbackSlice';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ feedbackData }) => {
	// const [comments, setComments] = useState([]);
	// const { comments } = feedbackData.comments;
	// console.log(comments);
	// const [data, setData] = useState(feedbackData[0]);
	// const { id } = useParams;
	// // const [feedbackId, setFeedbackId] = useState(id)
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	// dispatch(getSingleFeedback(id));
	// 	// setComments(feedbackData[0].comments);
	// 	setData(feedbackData[0]);
	// }, []);
	// console.log(feedbackData[0]);

	// useEffect(() => {
	// 	dispatch(getSingleFeedback(id));
	// }, [id]);

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
