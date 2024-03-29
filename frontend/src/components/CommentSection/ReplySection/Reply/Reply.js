import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyForm from '../../ReplyForm/ReplyForm';
import BlankProfilePic from '../../../../assets/blank-profile-picture.png';
import Modal from '../../../../components/Modal/Modal';
import './Reply.css';
import {
	deleteReply,
	editReply,
} from '../../../../reducers/feedbackCommentsReducer';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DropdownEdit from '../../DropdownEdit/DropdownEdit';
import { handleOutsideClick } from '../../../../utils/handleOutsideClick';
import { useNavigate } from 'react-router-dom';

const Reply = ({
	replyData,
	currentFeedback,
	replyToReply,
	setActive,
	comment,
	index,
	isMobile,
	edit,
	// replyEditValue,
	// repliedBy,
}) => {
	const [replyActive, setReplyActive] = useState(false);
	const [repliedBy, setRepliedBy] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [mobileDropdown, setMobileDropdown] = useState(false);
	const [editActive, setEditActive] = useState(false);
	const [editValue, setEditValue] = useState(replyData.replyBody);
	const user = useSelector(state => state.user);
	// const singleFeedback = useSelector(state => state.singleFeedback)

	const navigate = useNavigate();
	const dispatch = useDispatch();
	//
	//
	//
	//
	//
	//
	// need to change mongodb
	//
	//
	//
	//
	//
	//
	//
	//
	//
	// Set Edit active state through dropdown menu
	const setEdit = edt => {
		setEditActive(edt);
	};
	// useRef outside click handle
	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const toggle = () => setMobileDropdown(!mobileDropdown);

	// text trim\
	// console.log(replyData);
	const replyingTo = replyData.replyBody.split(' ')[0];
	const trimmedText = replyData.replyBody.split(' ').slice(1).join(' ');

	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setMobileDropdown)
	);
	useEffect(() => {
		// setEditValue(replyData.replyBody);
		setRepliedBy(replyingTo);
		setEditValue(replyData.replyBody);
	}, [replyData.replyBody, replyingTo]);

	// Edit change handler
	const editChangeHandler = e => {
		setEditValue(e.target.value);
	};

	// Edit form submit handler
	const handleSubmit = e => {
		e.preventDefault();
		try {
			dispatch(
				editReply(currentFeedback._id, comment._id, replyData._id, {
					editValue,
				})
			);
			// alert(editValue);
		} catch (error) {
			console.log(error);
		}
		setEditActive(false);
		// console.log(editValue);
		// console.log(replyEditValue);
	};

	const handleDelete = () => {
		dispatch(deleteReply(currentFeedback._id, comment._id, replyData._id));
	};

	const getReplyName = name => {
		setRepliedBy(name);
	};
	const getReplyActive = act => {
		setReplyActive(act);
	};

	const openModal = e => {
		e.preventDefault();
		setShowModal(true);
	};
	const closeModal = e => {
		e.preventDefault();
		setShowModal(false);
	};
	// console.log(replyData);

	// useEffect(() => {

	// }, [])

	return (
		<article className="Reply">
			<Modal
				active={showModal}
				closeModal={closeModal}
				handleDelete={handleDelete}
				isComment={false}
				isReply={true}
				param="reply"
			/>
			<div className="Reply__userBar">
				<div
					className="Reply__userBar--details"
					onClick={() => {
						user.id === replyData.repliedBy
							? navigate(`/user/${user.id}`)
							: navigate(`/user/${replyData.repliedBy}`);
					}}>
					<img src={BlankProfilePic} alt="" className="profileImage" />
					{/* <img
						src={
							replyData.profileImg && replyData.profileImg.exists
								? `/images/${replyData.profileImg.imageId}`
								: BlankProfilePic
						}
						alt=""
						className="profileImage"
					/> */}
					<div className="Reply__usernames">
						<h4 className="name">{replyData.name}</h4>
						<span className="username">@{replyData.username}</span>
					</div>
				</div>
				<div className="Reply__buttons">
					<button
						className="reply"
						onClick={() => setReplyActive(!replyActive)}>
						Reply
					</button>
					{replyData.repliedBy === user.id && !isMobile && (
						<>
							<button className="edit">edit</button>
							<button className="delete" onClick={openModal}>
								delete
							</button>
						</>
					)}
					{replyData.repliedBy === user.id && isMobile && (
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
				<p className="Reply__text">
					{/* {editValue.split(' ')[0].includes('@') ? ( */}
					<span className="replyingTo">{replyingTo}</span>
					{/* // ) : ( */}
					{/* // 	editValue.split(' ')[0] */}
					{/* // )} */}

					{/* {trimmedText} */}
					{/* {editValue.split(' ').splice(0, 1)} */}

					{/* {editValue.shift()} */}
					{editValue
						.split(' ')
						.filter(text => !text.includes(replyingTo))
						.join(' ')}
				</p>
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
							setEditValue(replyData.replyBody);
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
					replyData={replyData}
					currentFeedback={currentFeedback}
					setActive={setActive}
					comment={comment}
					getReplyName={getReplyName}
					getReplyActive={getReplyActive}
					replyToReply={true}
				/>
			)}

			{/* <Modal
				active={showModal}
				closeModal={closeModal}
				handleDelete={handleDelete}
				isComment={true}
				isReply={false}
			/> */}
		</article>
	);
};

export default Reply;
