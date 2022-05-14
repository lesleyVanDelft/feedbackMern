import './Modal.css';

const Modal = ({ active, closeModal, handleDelete, isComment, isReply }) => {
	return (
		<div className={`Modal ${active ? 'active' : ''}`}>
			<div className="Modal__content">
				<h3>
					Are you sure you want to delete your {isComment && 'comment?'}{' '}
					{isReply && 'reply?'} {isComment || isReply || 'feedback?'}
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
