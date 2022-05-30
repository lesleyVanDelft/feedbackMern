import { useEffect, useState } from 'react';
import ReplySection from '../ReplySection/ReplySection';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Reply from '../ReplySection/Reply/Reply';
import { useMediaQuery } from 'react-responsive';
import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import ReplyForm from '../ReplyForm/ReplyForm';
import './Comment.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../reducers/feedbackCommentsReducer';
import Modal from '../../Modal/Modal';

const Comment = ({
	commentData,
	currentFeedback,
	user,
	username,
	isMobile,
}) => {
	const [replyActive, setReplyActive] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [mobileDropdown, setMobileDropdown] = useState(false);
	const dispatch = useDispatch();

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
					{commentData.commentedBy === user.id && !isMobile && (
						<>
							<button className="edit">edit</button>
							<button className="delete" onClick={openModal}>
								delete
							</button>
						</>
					)}

					{commentData.commentedBy === user.id && isMobile && (
						<>
							<BsThreeDotsVertical
								onClick={() => {
									setMobileDropdown(!mobileDropdown);
								}}
								className={`${mobileDropdown ? 'active' : ''}`}
							/>
							{mobileDropdown && (
								<div className="dropdown">
									<button className="edit">edit</button>
									<button className="delete" onClick={openModal}>
										delete
									</button>
								</div>
							)}
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
								isMobile={isMobile}
							/>
						);
					})}
				</section>
			)}
		</article>
	);
};

export default Comment;
