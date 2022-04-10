import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyForm from '../../ReplyForm/ReplyForm';
import BlankProfilePic from '../../../../assets/blank-profile-picture.png';
import './Reply.css';
import { deleteReply } from '../../../../reducers/feedbackCommentsReducer';

const Reply = ({
	replyData,
	currentFeedback,
	// replyingTo,
	// replyActive,
	replyToReply,
	setActive,
	comment,
	index,
	// repliedBy,
}) => {
	const [replyActive, setReplyActive] = useState(false);
	const [repliedBy, setRepliedBy] = useState('');
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	// const currFb = useSelector(state => state.feedbackComments);
	// console.log(repliedBy);
	// console.log(comment.replies[0]);
	// console.log(comment);
	const handleDelete = () => {
		dispatch(deleteReply(currentFeedback._id, comment._id, replyData._id));
	};

	const getReplyName = name => {
		setRepliedBy(name);
	};
	const getReplyActive = act => {
		setReplyActive(act);
	};

	const replyingTo = replyData.replyBody.split(' ')[0];
	const trimmedText = replyData.replyBody.split(' ').slice(1).join(' ');

	return (
		<article className="Reply">
			<div className="Reply__userBar">
				<img src={BlankProfilePic} alt="" className="profileImage" />
				<div className="Reply__usernames">
					<h4 className="name">{replyData.name}</h4>
					<span className="username">@{replyData.username}</span>
					{/* {console.log(replyData.commentedBy.name)} */}
				</div>
				<div className="Reply__buttons">
					<button
						className="reply"
						onClick={() => setReplyActive(!replyActive)}>
						Reply
					</button>
					{replyData.repliedBy === user.id && (
						<button className="delete" onClick={handleDelete}>
							delete
						</button>
					)}
				</div>
			</div>
			<p className="Reply__text">
				{/* {console.log(replyData.replyBody.split(' ')[0].includes('@'))} */}
				{/* <span className="replyingTo">{`@${comment.username}`}</span> */}
				{/* <span className="replyingTo">{`@${
					replyToReply ? replyData.username : comment.username
				}`}</span> */}
				{/* {console.log(repliedBy)} */}
				{/* {replyData.replyBody} */}
				{replyData.replyBody.split(' ')[0].includes('@') ? (
					<span className="replyingTo">{replyingTo}</span>
				) : (
					replyData.replyBody.split(' ')[0]
				)}

				{trimmedText}
			</p>

			{replyActive && (
				<ReplyForm
					active={replyActive}
					replyData={replyData}
					currentFeedback={currentFeedback}
					setActive={setActive}
					comment={comment}
					getReplyName={getReplyName}
					getReplyActive={getReplyActive}
					replyToReply={true}
				/>
			)}
		</article>
	);
};

export default Reply;
