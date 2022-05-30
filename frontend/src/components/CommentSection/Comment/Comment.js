import { useEffect, useState } from 'react';
import ReplySection from '../ReplySection/ReplySection';
import Reply from '../ReplySection/Reply/Reply';
import { useMediaQuery } from 'react-responsive';
import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import ReplyForm from '../ReplyForm/ReplyForm';
import './Comment.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../reducers/feedbackCommentsReducer';
import Modal from '../../Modal/Modal';

const Comment = ({ commentData, currentFeedback, user, username }) => {
	const [replyActive, setReplyActive] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	// NPM React query, check if user is on mobile
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	const setActive = actv => {
		setReplyActive(actv);
	};
	const handleDelete = () => {
		dispatch(deleteComment(currentFeedback._id, commentData._id));
	};
	const openModal = e => {
		e.preventDefault();
		setShowModal(true);
	};
	const closeModal = e => {
		e.preventDefault();
		setShowModal(false);
	};

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
				</div>
				<div className="Comment__buttons">
					<button
						className="reply"
						onClick={() => setReplyActive(!replyActive)}>
						Reply
					</button>
					{commentData.commentedBy === user.id && (
						<>
							<button className="edit">edit</button>
							<button className="delete" onClick={openModal}>
								delete
							</button>
						</>
					)}
					<Modal
						active={showModal}
						closeModal={closeModal}
						handleDelete={handleDelete}
						isComment={true}
						isReply={false}
						param="comment"
					/>
				</div>
			</div>
			<p className="Comment__text">{commentData.commentBody}</p>

			{replyActive && (
				<ReplyForm
					active={replyActive}
					comment={commentData}
					currentFeedback={currentFeedback}
					setActive={setActive}
					replyToReply={false}
				/>
			)}

			{commentData.replies && (
				<section className="Comment__replies">
					{commentData.replies.map((reply, i) => {
						return (
							<Reply
								comment={commentData}
								replyData={reply}
								replyingTo={commentData.username}
								user={user}
								currentFeedback={currentFeedback}
								key={i}
								index={i}
								setActive={setActive}
								replyToReply={true}
							/>
						);
					})}
				</section>
			)}
		</article>
	);
};

export default Comment;
