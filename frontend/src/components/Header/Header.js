import { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { logout, reset } from '../../features/auth/authSlice';
import { logoutUser } from '../../reducers/userReducer';
// import { resetFeedbacks } from '../../reducers/feedbackReducer';
import './Header.css';

const Header = ({ login }) => {
	const [location, setLocation] = useState(login);
	// console.log(login);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const onLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
	};

	const handleClick = () => {
		setLocation(!location);
	};

	return (
		<nav className={`HeaderLogin ${user === null ? 'active' : ''}`}>
			<div className="HeaderLogin__content">
				<Link
					to="/login"
					onClick={() => handleClick()}
					className={`loginBtn ${location === true ? 'active' : ''}`}>
					{/* <button
							onClick={handleClick}
							className={`btn ${location === 'login' ? 'active' : null}`}>
							
						</button> */}
					<FaSignInAlt /> <span>Login</span>
				</Link>

				<Link
					to="/register"
					onClick={() => handleClick()}
					className={`registerBtn ${location === false ? 'active' : ''}`}>
					{/* <button
							onClick={handleClick}
							className={`btn ${location === 'register' ? 'active' : null}`}>
							
						</button> */}
					<FaUser /> <span>Register</span>
				</Link>
			</div>
		</nav>
	);
};

export default Header;
