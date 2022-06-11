import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyForm from '../../ReplyForm/ReplyForm';
import BlankProfilePic from '../../../../assets/blank-profile-picture.png';
import Modal from '../../../../components/Modal/Modal';
import './Reply.css';
import { deleteReply } from '../../../../reducers/feedbackCommentsReducer';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DropdownEdit from '../../DropdownEdit/DropdownEdit';
import { handleOutsideClick } from '../../../../utils/handleOutsideClick';

const Reply = ({
	replyData,
	currentFeedback,
	replyToReply,
	setActive,
	comment,
	index,
	isMobile,
	// repliedBy,
}) => {
	const [replyActive, setReplyActive] = useState(false);
	const [repliedBy, setRepliedBy] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [mobileDropdown, setMobileDropdown] = useState(false);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const toggle = () => setMobileDropdown(!mobileDropdown);
	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setMobileDropdown)
	);

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

	const replyingTo = replyData.replyBody.split(' ')[0];
	const trimmedText = replyData.replyBody.split(' ').slice(1).join(' ');

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
				<img
					src={BlankProfilePic}
					alt="empty profile img"
					className="replyImg"
				/>
				<div className="Reply__usernames">
					<h4 className="name">{replyData.name}</h4>
					<span className="username">@{replyData.username}</span>
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
							{mobileDropdown && <DropdownEdit openModal={openModal} />}
						</div>
					)}
				</div>
			</div>
			<p className="Reply__text">
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
