import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Reply from '../ReplySection/Reply/Reply';
import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import ReplyForm from '../ReplyForm/ReplyForm';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../reducers/feedbackCommentsReducer';
import Modal from '../../Modal/Modal';
import DropdownEdit from '../DropdownEdit/DropdownEdit';
import { handleOutsideClick } from '../../../utils/handleOutsideClick';
import './Comment.css';

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
	const [editActive, setEditActive] = useState(false);
	const [editValue, setEditValue] = useState(commentData.commentBody);
	const dispatch = useDispatch();

	// Outside click handling
	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const toggle = () => setMobileDropdown(!mobileDropdown);
	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setMobileDropdown)
	);

	// Set Edit active state through dropdown menu
	const setEdit = edt => {
		setEditActive(edt);
	};

	// Edit change handler
	const editChangeHandler = e => {
		setEditValue(e.target.value);
	};

	// Set Reply active
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
				<img
					src={
						user.profileImg.exists && commentData.commentedBy === user.id
							? `/images/${user.profileImg.imageId}`
							: BlankProfilePic
					}
					alt=""
					className="profileImage"
				/>
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
							<button className="edit">Edit</button>
							<button className="delete" onClick={openModal}>
								Delete
							</button>
						</>
					)}

					{commentData.commentedBy === user.id && isMobile && (
						<div
							className={`${
								mobileDropdown ? 'dropdownToggle active' : 'dropdownToggle'
							}`}
							ref={dropdownRef}
							onClick={toggle}>
							<BsThreeDotsVertical className="toggleDropdown" />
							{mobileDropdown && (
								<DropdownEdit openModal={openModal} edit={setEdit} />
							)}
						</div>
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

			{editActive === false ? (
				<p className="Comment__text">{commentData.commentBody}</p>
			) : (
				<form className="EditForm">
					<textarea
						className="EditForm__input"
						type="text"
						name="commentText"
						// value={commentData.commentBody}
						value={editValue}
						onChange={editChangeHandler}
					/>
					<button
						className="btn btn-darkBlue"
						onClick={() => {
							setEditActive(false);
							setEditValue(commentData.commentBody);
						}}>
						Cancel
					</button>
					<button className="btn btn-purple">Submit Changes</button>
				</form>
			)}

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
