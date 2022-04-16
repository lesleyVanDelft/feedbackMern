import { useState } from 'react';
import { useDispatch } from 'react-redux';
import BlankProfilePic from '../../../../assets/blank-profile-picture.png';
import { deleteReply } from '../../../../reducers/feedbackCommentsReducer';
import ReplyForm from '../../ReplyForm/ReplyForm';
import './ExtraReply.css';

const ExtraReply = ({
	replyData,
	currentFeedback,
	user,
	replyToReply,
	comment,
}) => {
	const [replyActive, setReplyActive] = useState(false);
	const dispatch = useDispatch();
	const getReplyActive = act => {
		setReplyActive(act);
	};

	const handleDelete = () => {
		dispatch(deleteReply(currentFeedback._id, comment._id, replyData._id));
	};

	const repliedTo = () => {};
	return (
		<article className="ExtraReply">
			<div className="ExtraReply__userBar">
				<img src={BlankProfilePic} alt="" className="profileImage" />
				<div className="ExtraReply__usernames">
					<h4 className="name">{replyData.name}</h4>
					<span className="username">@{replyData.username}</span>
					{/* {console.log(replyData.commentedBy.name)} */}
				</div>
				<div className="ExtraReply__buttons">
					<button
						className="reply"
						onClick={() => setReplyActive(!replyActive)}>
						ExtraReply
					</button>
					{replyData.repliedBy === user.id && (
						<button className="delete" onClick={handleDelete}>
							delete
						</button>
					)}
				</div>
			</div>
			<p className="ExtraReply__text">
				{/* <span className="replyingTo">{`@${comment.username}`}</span> */}
				{/* <span className="replyingTo">{`@${replyData.username}`}</span> */}
				{/* {console.log(repliedBy)} */}
				{replyData.replyBody.split(' ')[0].includes('@') ? (
					<>
						{/* <span className="replyingTo">@{replyData.username}</span> */}

						<span className="replyingTo">
							{replyData.replyBody.split(' ')[0]}
						</span>

						{replyData.replyBody.split(' ').slice(1)}
					</>
				) : null}
				{replyData.replyBody}
				{/* {console.log(replyData.replyBody.split(' ')[0].includes('@'))} */}
			</p>

			{replyActive && (
				<ReplyForm
					active={replyActive}
					replyData={replyData}
					currentFeedback={currentFeedback}
					getReplyActive={getReplyActive}
					// setExtraReplyStateActive={setExtraReplyStateActive}
					comment={replyData}
					// getExtraReplyName={getExtraReplyName}
					replyToReply={replyToReply}
				/>
			)}
		</article>
	);
};

export default ExtraReply;
