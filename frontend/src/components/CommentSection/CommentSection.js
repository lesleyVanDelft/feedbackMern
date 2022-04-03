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
	const feedbackComments = useSelector(state => state.feedbackComments);
	const user = useSelector(state => state.user);

	if (!comments) {
		return <h2>Loading</h2>;
	}

	// useEffect(() => {
	// 	setCommentData()
	// }, [])
	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">{comments.length} Comments</h2>
			<div className="CommentSection__comments">
				{comments.map((comment, i) => {
					return <Comment commentData={comment} key={i} user={user} />;
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
