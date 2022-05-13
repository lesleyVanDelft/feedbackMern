import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { VscTriangleDown } from 'react-icons/vsc';
import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutUser } from '../../reducers/userReducer';
import { useState } from 'react';
import UserDropdown from '../Dashboard/UserDropdown/UserDropdown';

const menuVisibility = {
	hidden: { opacity: 0, right: -150 },
	visible: { opacity: 1, right: 0 },
	exit: { opacity: 0, right: -150 },
};

const MobileDashboard = ({ category, isVisible, logout }) => {
	const [userActive, setUserActive] = useState(false);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
	};
	const handleUserClick = () => {
		setUserActive(!userActive);
	};
	return (
		<AnimatePresence>
			{isVisible && (
				<motion.nav
					className="MobileDashboard"
					key="mobileNav"
					variants={menuVisibility}
					initial="hidden"
					animate={isVisible ? 'visible' : 'hidden'}
					exit="exit">
					<div className="Dashboard__mobile--user">
						<h3 className="userWelcome">
							Hi there,
							<span
								className={`user ${userActive && 'active'}`}
								onClick={handleUserClick}>
								@{user && user.username}
								<VscTriangleDown />
								<AnimatePresence>
									{userActive && <UserDropdown mobile={true} logout={logout} />}
								</AnimatePresence>
							</span>
						</h3>
					</div>
					<FilterButtons category={category} />
					<Roadmap />
					<button className="btn btn-darkBlue" onClick={logout}>
						Log Out
					</button>
				</motion.nav>
			)}
		</AnimatePresence>
	);
};

export default MobileDashboard;
