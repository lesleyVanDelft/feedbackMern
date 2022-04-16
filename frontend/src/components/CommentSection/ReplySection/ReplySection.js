import ExtraReply from './ExtraReply/ExtraReply';
import Reply from './Reply/Reply';
import './ReplySection.css';

const ReplySection = ({ replies, currentFeedback, user, comment }) => {
	return (
		<section className="ReplySection">
			{replies.length > 0 &&
				replies.map((reply, i) => {
					return (
						<ExtraReply
							replyData={reply}
							// replyingTo={reply.username}
							currentFeedback={currentFeedback}
							key={i}
							user={user}
							replyToReply={true}
							comment={comment}
						/>
					);
				})}
		</section>
	);
};

export default ReplySection;
