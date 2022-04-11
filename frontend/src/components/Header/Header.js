import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { logout, reset } from '../../features/auth/authSlice';
import { logoutUser } from '../../reducers/userReducer';
// import { resetFeedbacks } from '../../reducers/feedbackReducer';
import './Header.css';
import { useState } from 'react';

const Header = ({ login }) => {
	const [location, setLocation] = useState('login');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const onLogout = () => {
		dispatch(logoutUser());
		// dispatch(resetFeedbacks());

		navigate('/login');
	};

	const handleClick = () => {
		if (location === 'login') {
			setLocation('login');
		} else {
			setLocation('register');
		}

		// setLocation(e.target.value)
		// console.log(e.target.value);/
	};

	return (
		<header className={`Header ${login ? 'mobile' : 'desktop'}`}>
			{user && (
				<div className="Header__logo">
					<Link to="/">
						{user ? (
							<span className="welcome">
								Welcome, <span className="welcome__user">@{user.username}</span>
							</span>
						) : null}
					</Link>
				</div>
			)}

			{user ? (
				<div className="Header__content">
					<button className="btn btnLogout" onClick={onLogout}>
						<FaSignOutAlt /> Logout
					</button>
				</div>
			) : (
				<div className="Header__content login">
					<Link
						to="/login"
						className={`loginBtn ${location === 'login' && 'active'}`}
						onClick={() => {
							setLocation('login');
						}}>
						{/* <button
							onClick={handleClick}
							className={`btn ${location === 'login' ? 'active' : null}`}>
							
						</button> */}
						<FaSignInAlt /> <span>Login</span>
					</Link>

					<Link
						to="/register"
						className={`registerBtn ${location === 'register' && 'active'}`}
						onClick={() => {
							setLocation('register');
						}}>
						{/* <button
							onClick={handleClick}
							className={`btn ${location === 'register' ? 'active' : null}`}>
							
						</button> */}
						<FaUser /> <span>Register</span>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
