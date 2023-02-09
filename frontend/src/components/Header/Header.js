import { useState } from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
	const [active, setActive] = useState('login');
	const user = useSelector(state => state.user);

	const navigate = useNavigate();
	return (
		<nav className={`HeaderLogin ${user === null ? 'active' : ''}`}>
			<Link
				to="/login"
				onClick={() => {
					setActive('login');
					// navigate('/login');
				}}
				className={`loginBtn ${active === 'login' ? 'active' : ''}`}>
				<FaSignInAlt /> <span>Login</span>
			</Link>
			<Link
				to="/register"
				onClick={() => {
					setActive('register');
					// navigate('/register');
				}}
				className={`registerBtn ${active === 'register' ? 'active' : ''}`}>
				<FaUser /> <span>Register</span>
			</Link>
		</nav>
		// <nav className={`HeaderLogin ${user === null ? 'active' : ''}`}>
		// 	<Link
		// 		to="/login"
		// 		onClick={() => setActive(true)}
		// 		className={`loginBtn ${active ? 'active' : ''}`}>
		// 		<FaSignInAlt /> <span>Login</span>
		// 	</Link>
		// 	<Link
		// 		to="/login/register"
		// 		onClick={() => setActive(false)}
		// 		className={`registerBtn ${!active ? 'active' : ''}`}>
		// 		<FaUser /> <span>Register</span>
		// 	</Link>
		// </nav>
	);
};

export default Header;
