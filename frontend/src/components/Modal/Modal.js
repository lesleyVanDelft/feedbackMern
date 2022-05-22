import './Modal.css';

const Modal = ({
	active,
	closeModal,
	handleDelete,
	isComment,
	isReply,
	param,
}) => {
	return (
		<div className={`Modal ${active ? 'active' : ''}`}>
			<div className="Modal__content">
				<h3>
					{{
						feedback: 'Are you sure you want to delete your feedback?',
						comment: 'Are you sure you want to delete your comment?',
						reply: 'Are you sure you want to delete your reply?',
					}[param] || 'You are not allowed to do that. :('}
				</h3>
				<div className="buttons">
					<button className="btn btn-darkBlue" onClick={closeModal}>
						Cancel
					</button>
					<button className="btn btn-red" onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;

// {isComment && 'delete your comment?'}
// 					{isReply && 'delete your reply?'}{' '}
// 					{isComment || isReply || 'delete your feedback?'}
