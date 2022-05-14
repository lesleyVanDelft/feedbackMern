import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyForm from '../../ReplyForm/ReplyForm';
import BlankProfilePic from '../../../../assets/blank-profile-picture.png';
import Modal from '../../../../components/Modal/Modal';
import './Reply.css';
import { deleteReply } from '../../../../reducers/feedbackCommentsReducer';

const Reply = ({
	replyData,
	currentFeedback,
	replyToReply,
	setActive,
	comment,
	index,
	// repliedBy,
}) => {
	const [replyActive, setReplyActive] = useState(false);
	const [repliedBy, setRepliedBy] = useState('');
	const [showModal, setShowModal] = useState(false);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

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
			/>
			<div className="Reply__userBar">
				<img
					src={BlankProfilePic}
					alt=""
					// className="profileImage"
					className="replyImg"
				/>
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
						<button className="delete" onClick={openModal}>
							delete
						</button>
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
