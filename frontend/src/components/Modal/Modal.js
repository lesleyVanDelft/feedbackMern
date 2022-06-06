import './Modal.css';

const Modal = ({
	active,
	closeModal,
	handleDelete,
	isComment,
	isReply,
	param,
	changePassword,
}) => {
	return (
		<div className={`Modal ${active ? 'active' : ''}`}>
			<div className="Modal__content">
				<h3>
					{{
						feedback: 'Are you sure you want to delete your feedback?',
						comment: 'Are you sure you want to delete your comment?',
						reply: 'Are you sure you want to delete your reply?',
						logout: 'Are you sure you want to logout?',
					}[param] || 'You are not allowed to do that. :('}
				</h3>

				{changePassword && (
					<form>
						<label htmlFor="currentPassword">Enter current password:</label>
						<input type="password" id="currentPassword" />

						<label htmlFor="newPassword">Enter new password:</label>
						<input type="password" id="newPassword" />

						<label htmlFor="confirmPassword">Confirm new password:</label>
						<input type="password" name="" id="confirmPassword" />
					</form>
				)}

				<div className="buttons">
					<button className="btn btn-darkBlue" onClick={closeModal}>
						Cancel
					</button>
					<button className="btn btn-red" onClick={handleDelete}>
						{{
							delete: 'Delete',
							logout: 'Logout',
						}[param] || 'Delete'}
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
