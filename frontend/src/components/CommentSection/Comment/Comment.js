import { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Reply from '../ReplySection/Reply/Reply';
import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import ReplyForm from '../ReplyForm/ReplyForm';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteComment,
	editComment,
} from '../../../reducers/feedbackCommentsReducer';
import Modal from '../../Modal/Modal';
import DropdownEdit from '../DropdownEdit/DropdownEdit';
import { handleOutsideClick } from '../../../utils/handleOutsideClick';
import './Comment.css';
import { useNavigate } from 'react-router-dom';

const Comment = ({ commentData, currentFeedback, user, isMobile }) => {
	const [replyActive, setReplyActive] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [mobileDropdown, setMobileDropdown] = useState(false);
	const [editActive, setEditActive] = useState(false);
	const [editValue, setEditValue] = useState(commentData.commentBody);
	const [replyValues, setReplyValues] = useState(commentData.replies);
	const [userImage, setUserImage] = useState();
	const userId = useSelector(state => state.user);
	// console.log(commentData);
	// console.log(user.profileImg.imageId
	// console.log(commentData);
	console.log(commentData.imageId);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Outside click handling
	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const toggle = () => setMobileDropdown(!mobileDropdown);
	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setMobileDropdown)
	);

	useEffect(() => {
		setUserImage(commentData.profileImg.imageId);
	}, [commentData.profileImg.imageId]);

	useEffect(() => {
		setEditValue(commentData.commentBody);
	}, [commentData.commentBody]);

	useEffect(() => {
		setReplyValues(commentData.replies);
	}, [commentData.replies]);

	// Set Edit active state through dropdown menu
	const setEdit = edt => {
		setEditActive(edt);
	};

	// Edit change handler
	const editChangeHandler = e => {
		setEditValue(e.target.value);
	};

	// Edit form submit handler
	const handleSubmit = e => {
		e.preventDefault();
		try {
			dispatch(
				editComment(currentFeedback._id, commentData._id, {
					editValue,
				})
			);
		} catch (error) {
			console.log(error);
		}
		setEditActive(false);
	};

	// Set Reply active
	const setActive = actv => {
		setReplyActive(actv);
	};
	const openModal = e => {
		e.preventDefault();
		setShowModal(true);
	};
	const closeModal = e => {
		e.preventDefault();
		setShowModal(false);
	};
	const handleDelete = e => {
		dispatch(deleteComment(currentFeedback._id, commentData._id));
		closeModal(e);
	};

	if (!commentData) {
		return <h1>loading</h1>;
	}

	return (
		<article className="Comment">
			<Modal
				active={showModal}
				closeModal={closeModal}
				handleDelete={handleDelete}
				isComment={true}
				isReply={false}
				param="comment"
			/>
			{/* <img src={`/images/${user.profileImg.imageId}`} alt="fuku"></img> */}
			<div className="Comment__userBar">
				<div
					className="Comment__userBar--details"
					onClick={() => {
						user.id === commentData.commentedBy
							? navigate(`/user/${user.id}`)
							: navigate(`/user/${commentData.commentedBy}`);
					}}>
					{/* <img
						src={BlankProfilePic}
						alt="User profile"
						className="profileImage"
					/> */}
					<img
						src={
							commentData.profileImg.exists
								? `/images/${userImage}`
								: BlankProfilePic
						}
						alt="User profile"
						className="profileImage"
					/>
					{/* <img
						src={
							user.profileImg && user.profileImg.exists
								? `/images/${user.profileImg.imageId}`
								: BlankProfilePic
						}
						alt="User profile"
						className="profileImage"
					/> */}
					<div className="Comment__usernames">
						<h4 className="name">{commentData.name}</h4>
						<span className="username">@{commentData.username}</span>
					</div>
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
				</div>
			</div>

			{editActive === false ? (
				<p className="Comment__text">{editValue}</p>
			) : (
				<form className="EditForm" onSubmit={handleSubmit}>
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
						type="button"
						onClick={() => {
							setEditActive(false);
							setEditValue(commentData.commentBody);
						}}>
						Cancel
					</button>
					<button className="btn btn-purple" type="submit">
						Submit Changes
					</button>
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
								replyValues={replyValues}
								replyingTo={commentData.username}
								user={user}
								currentFeedback={currentFeedback}
								key={i}
								index={i}
								setActive={setActive}
								replyToReply={true}
								isMobile={isMobile}
								edit={setEdit}
								// replyEditValue={replyEditValue}
							/>
						);
					})}
				</section>
			)}
		</article>
	);
};

export default Comment;
