import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../reducers/userReducer';
import './Modal.css';

const Modal = ({ active, closeModal, handleDelete, param, changePassword }) => {
	const dispatch = useDispatch();

	const passwordValues = {
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	};
	// Handle all password input changes
	const [passwordValue, setPasswordValue] = useState(passwordValues);
	const handleChange = e => {
		const { name, value } = e.target;
		setPasswordValue({
			...passwordValue,
			[name]: value,
		});
	};
	// Handle password change form submit
	const handleSubmit = e => {
		e.preventDefault();
		// dispatch(changePassword(passwordValue))
		console.log(passwordValue);
	};

	return (
		<div className={`Modal ${active ? 'active' : ''}`}>
			<div className="Modal__content">
				<h3>
					{{
						feedback: 'Are you sure you want to delete your feedback?',
						comment: 'Are you sure you want to delete your comment?',
						reply: 'Are you sure you want to delete your reply?',
						logout: 'Are you sure you want to logout?',
						password: 'Change your password?',
					}[param] || 'You are not allowed to do that. :('}
				</h3>

				{param === 'password' && (
					<form className="passwordForm">
						<label htmlFor="currentPassword">Current password:</label>
						<input
							type="password"
							id="currentPassword"
							name="currentPassword"
							placeholder="Enter current password"
							value={passwordValue.password}
							onChange={handleChange}
						/>

						<label htmlFor="newPassword">New password:</label>
						<input
							type="password"
							id="newPassword"
							name="newPassword"
							placeholder="Enter a new password"
							value={passwordValue.newPassword}
							onChange={handleChange}
						/>

						<label htmlFor="confirmNewPassword">Confirm new password:</label>
						<input
							type="password"
							id="confirmNewPassword"
							name="confirmNewPassword"
							placeholder="Confirm new password"
							value={passwordValue.confirmNewPassword}
							onChange={handleChange}
						/>
					</form>
				)}

				<div className="buttons">
					<button
						className="btn btn-darkBlue"
						onClick={closeModal}
						type="button">
						Cancel
					</button>
					<button
						className={`btn ${param === 'password' ? 'btn-blue' : 'btn-red'}`}
						onClick={param === 'password' ? handleSubmit : handleDelete}
						type={param === 'password' ? 'submit' : 'button'}>
						{{
							delete: 'Delete',
							logout: 'Logout',
							password: 'Change Password',
						}[param] || 'Delete'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
