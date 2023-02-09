import { useEffect, useState } from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import PageLogo from '../components/PageLogo/PageLogo';
import Login from './Login';
import Register from './Register';

const AuthPage = ({ loc }) => {
	const [authState, setAuthState] = useState('/login');
	const [active, setActive] = useState('login');
	const user = useSelector(state => state.user);

	return (
		<div className="AuthPage">
			<PageLogo className="logo" />
			{/* <Header /> */}
			<nav className={`HeaderLogin ${user === null ? 'active' : ''}`}>
				<button
					// to="/login"
					onClick={() => {
						setActive('login');
						// navigate('/login');
						setAuthState('login');
					}}
					className={`loginBtn ${active === 'login' ? 'active' : ''}`}>
					<FaSignInAlt /> <span>Login</span>
				</button>
				<button
					// to="/register"
					onClick={() => {
						setActive('register');
						setAuthState('register');
						// navigate('/register');
					}}
					className={`registerBtn ${active === 'register' ? 'active' : ''}`}>
					<FaUser /> <span>Register</span>
				</button>
			</nav>
			{authState === 'register' ? <Register /> : <Login />}
		</div>
	);
};

export default AuthPage;
