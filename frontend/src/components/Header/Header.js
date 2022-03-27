import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { logout, reset } from '../../features/auth/authSlice';
import { logoutUser } from '../../reducers/userReducer';

import './Header.css';
import { useState } from 'react';

const Header = () => {
	const [location, setLocation] = useState('login');

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const onLogout = () => {
		dispatch(logoutUser());
	};

	const handleClick = e => {
		// setLocation(e.target.value)
		console.log(e.target.value);
	};

	return (
		<header className="Header">
			{user && (
				<div className="Header__logo">
					<Link to="/">{user ? `Welcome, ${user.username}` : null}</Link>
				</div>
			)}
			{/* <ul className='Header__content'>
				{user ? (
					<li>
						<button className="btn" onClick={onLogout}>
							<FaSignOutAlt /> Logout
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to="/login">
								<FaSignInAlt /> Login
							</Link>
						</li>
						<li>
							<Link to="/register">
								<FaUser /> Register
							</Link>
						</li>
					</>
				)}
			</ul> */}

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
						onClick={() => {
							setLocation('login');
						}}>
						<button className={`btn ${location === 'login' ? 'active' : null}`}>
							<FaSignInAlt /> <span>Login</span>
						</button>
					</Link>

					<Link to="/register">
						<button
							className={`btn ${location === 'register' ? 'active' : null}`}
							onClick={() => {
								setLocation('register');
							}}>
							<FaUser /> <span>Register</span>
						</button>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
