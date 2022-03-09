import './CommentSection.css';

const CommentSection = ({ feedbackData }) => {
	// console.log(feedbackData);
	return (
		<section className="CommentSection">
			<h2 className="CommentSection__count">
				{feedbackData[0].comments.length} Comments
			</h2>
		</section>
	);
};

export default CommentSection;
