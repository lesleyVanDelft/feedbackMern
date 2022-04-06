import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReplyForm from '../../ReplyForm/ReplyForm';
import BlankProfilePic from '../../../../assets/blank-profile-picture.png';
import './Reply.css';

const Reply = ({ replyData, currentFeedback, replyingTo }) => {
	const [replyActive, setReplyActive] = useState(false);
	const user = useSelector(state => state.user);

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
						<button className="delete">delete</button>
					)}
				</div>
			</div>
			<p className="Reply__text">
				<span className="replyingTo">{`@${replyingTo}`}</span>
				{replyData.replyBody}
			</p>

			{replyActive && (
				<ReplyForm
					active={replyActive}
					comment={replyData}
					currentFeedback={currentFeedback}
				/>
			)}
		</article>
	);
};

export default Reply;
