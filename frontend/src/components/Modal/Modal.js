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
					Are you sure you want to{' '}
					{{
						feedback: 'delete your feedback?',
						comment: 'delete your comment?',
						reply: 'delete your reply?',
					}[param] || 'delete your feedback?'}
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
