import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { changePassword } from '../../../reducers/userReducer';
import './PasswordModal.css';

const initialPasswordValues = {
	currentPassword: '',
	newPassword: '',
	confirmNewPassword: '',
};

const PasswordModal = ({ closeModal, active }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	// Handle all password input changes
	const [passwordValues, setPasswordValues] = useState(initialPasswordValues);
	const [passwordChanged, setPasswordChanged] = useState(false);
	const handleChange = e => {
		const { name, value } = e.target;
		setPasswordValues({
			...passwordValues,
			[name]: value,
		});
	};

	// const user = useSelector(state => state.user);
	const [error, setError] = useState(null);
	const errorMessage = useSelector(state => state.errorMessage);

	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: Yup.object({
			currentPassword: Yup.string().required('Current password required'),
			newPassword: Yup.string().required('Please enter a new password'),
			confirmNewPassword: Yup.string().required(
				'Please confirm your new password'
			),
		}),
		onSubmit: values => {
			if (values.newPassword === values.confirmNewPassword) {
				dispatch(
					changePassword(user.id, {
						currentPassword: values.currentPassword,
						newPassword: values.newPassword,
					})
				);
				setPasswordChanged(true);
			} else {
				return null;
			}
		},
	});

	useEffect(() => {
		return errorMessage ? setError(errorMessage) : null;
	}, [errorMessage]);

	useEffect(() => {
		if (passwordChanged === true) {
			closeModal();
		} else {
			setPasswordChanged(false);
		}
	}, [closeModal, passwordChanged]);

	// const handleSubmit = e => {
	// 	e.preventDefault();
	// 	// getPasswordData(passwordValues);
	// 	const { currentPassword, newPassword, confirmNewPassword } = passwordValues;
	// 	if (newPassword === confirmNewPassword) {
	// 		try {
	// 			dispatch(changePassword(user.id, { currentPassword, newPassword }));
	// 			setPasswordChanged(true);
	// 		} catch (error) {
	// 			console.log(`${error} ---- handleSubmit`);
	// 			setPasswordChanged(false);
	// 		}
	// 	} else {
	// 		console.log('passwords do not match');
	// 		setPasswordChanged(false);
	// 	}
	// };

	return (
		<div className={`PasswordModal ${active ? 'active' : ''}`}>
			<div className="PasswordModal__content">
				<h3>Change your password?</h3>
				<form className="passwordForm" onSubmit={formik.handleSubmit}>
					{error && error.status === 400 && (
						<span className="errorMsg">{error.data}</span>
					)}
					<label htmlFor="currentPassword">Current password:</label>
					<input
						type="password"
						id="currentPassword"
						name="currentPassword"
						placeholder="Enter current password"
						value={formik.values.currentPassword}
						// value={passwordValues.password}
						// onChange={handleChange}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<label htmlFor="newPassword">New password:</label>
					<input
						type="password"
						id="newPassword"
						name="newPassword"
						placeholder="Enter a new password"
						value={formik.values.newPassword}
						// value={passwordValues.newPassword}
						// onChange={handleChange}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>

					<label htmlFor="confirmNewPassword">Confirm new password:</label>
					<input
						type="password"
						id="confirmNewPassword"
						name="confirmNewPassword"
						placeholder="Confirm new password"
						value={formik.values.confirmNewPassword}
						// value={passwordValues.confirmNewPassword}
						// onChange={handleChange}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<div className="buttons">
						<button
							className="btn btn-darkBlue"
							onClick={closeModal}
							type="button">
							Cancel
						</button>
						<button className={`btn btn-blue`} type="submit">
							Change Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PasswordModal;
