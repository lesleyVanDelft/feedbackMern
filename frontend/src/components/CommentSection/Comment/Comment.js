import { useState } from 'react';
import ReplySection from '../ReplyForm/ReplyForm';
import Reply from '../ReplySection/Reply/Reply';
import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import ReplyForm from '../ReplyForm/ReplyForm';
import './Comment.css';

const Comment = ({ commentData, currentFeedback, user }) => {
	const [replyActive, setReplyActive] = useState(false);
	// console.log(currentFeedback);
	// console.log(user);

	if (!commentData) {
		return <h1>loading</h1>;
	}
	return (
		<article className="Comment">
			<div className="Comment__userBar">
				<img src={BlankProfilePic} alt="" className="profileImage" />
				<div className="Comment__usernames">
					<h4 className="name">{commentData.name}</h4>
					<span className="username">@{commentData.username}</span>
					{/* {console.log(commentData.commentedBy.name)} */}
				</div>
				<div className="Comment__buttons">
					<button
						className="reply"
						onClick={() => setReplyActive(!replyActive)}>
						Reply
					</button>
					{commentData.commentedBy === user.id && (
						<button className="delete">delete</button>
					)}
				</div>
			</div>
			<p className="Comment__text">{commentData.commentBody}</p>

			{replyActive && (
				<ReplyForm
					active={replyActive}
					comment={commentData}
					currentFeedback={currentFeedback}
				/>
			)}

			{/* <section className="Comment__replies">
				{commentData.replies.length > 0 &&
					commentData.replies.map((reply, i) => {
						return (
							<Reply
								replyData={reply}
								replyingTo={commentData.username}
								currentFeedback={currentFeedback}
								key={i}
							/>
						);
					})}
			</section> */}

			{commentData.replies.length > 0 && (
				<section className="Comment__replies">
					{commentData.replies.length > 0 &&
						commentData.replies.map((reply, i) => {
							return (
								<Reply
									replyData={reply}
									replyingTo={commentData.username}
									currentFeedback={currentFeedback}
									key={i}
								/>
							);
						})}
				</section>
			)}
			{/* <ReplySection
				replies={commentData.replies}
				replyingTo={commentData.username}
				currentFeedback={currentFeedback}
			/> */}
		</article>

		// commentData.map(comment => {
		// 	return (
		// 		<article className="Comment">
		// 			<div className="Comment__userBar">
		// 				<img src={BlankProfilePic} alt="" className="profileImage" />
		// 				<div className="userNames">
		// 					<h4 className="name">{user.name}</h4>
		// 					<span className="username">@{user.username}</span>
		// 				</div>
		// 				<button className="reply">Reply</button>
		// 			</div>

		// 			<p>{comment.commentBody}</p>
		// 		</article>
		// 	);
		// })
		// )}
	);
};

export default Comment;
