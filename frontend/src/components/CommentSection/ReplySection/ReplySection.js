import Reply from './Reply/Reply';
import './ReplySection.css';

const ReplySection = ({ replies, replyingTo, currentFeedback }) => {
	return (
		<>
			{replies.length > 0 &&
				replies.map((reply, i) => {
					return (
						<Reply
							replyData={reply}
							replyingTo={replyingTo}
							currentFeedback={currentFeedback}
							key={i}
						/>
					);
				})}
		</>
	);
};

export default ReplySection;
