import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';
import './CommentSection.css';

const CommentSection = ({ feedbackData }) => {
	// console.log(feedbackData);
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
