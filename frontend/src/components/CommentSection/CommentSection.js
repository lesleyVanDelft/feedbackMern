import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSingleFeedback } from '../../features/feedbacks/feedbackSlice';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ feedbackData }) => {
	const feedbackComments = useSelector(state => state.feedbackComments);

	if (!feedbackComments) {
		return <h2>Loading</h2>;
	}
	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">
				{feedbackComments.comments.length} Comments
			</h2>
			<div className="CommentSection__comments">
				{feedbackComments.comments.map((com, i) => {
					return <Comment commentData={com} key={i} />;
				})}
			</div>
			<AddComment feedbackComments={feedbackComments} />
		</section>
	);
};

export default CommentSection;
