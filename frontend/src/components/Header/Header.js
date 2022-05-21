import { useState } from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = ({ login }) => {
	const [active, setActive] = useState(login);
	const user = useSelector(state => state.user);

	return (
		<nav className={`HeaderLogin ${user === null ? 'active' : ''}`}>
			<Link
				to="/login"
				onClick={() => setActive(true)}
				className={`loginBtn ${active ? 'active' : ''}`}>
				<FaSignInAlt /> <span>Login</span>
			</Link>
			<Link
				to="/register"
				onClick={() => setActive(false)}
				className={`registerBtn ${!active ? 'active' : ''}`}>
				<FaUser /> <span>Register</span>
			</Link>
		</nav>
	);
};

export default Header;
