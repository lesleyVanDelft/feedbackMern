import { useSelector } from 'react-redux';
import { VscTriangleDown } from 'react-icons/vsc';
import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import UserDropdown from '../Dashboard/UserDropdown/UserDropdown';

const menuVisibility = {
	hidden: { opacity: 0, right: -150 },
	visible: { opacity: 1, right: 0 },
	exit: { opacity: 0, right: -350 },
};
const overlayVisibility = {
	hidden: { opacity: 0, right: -150 },
	visible: { opacity: 0.5, right: 0 },
	exit: { opacity: 0, right: -350 },
};

const MobileDashboard = ({ category, isVisible, logout }) => {
	const [userActive, setUserActive] = useState(false);
	const user = useSelector(state => state.user);

	const handleUserClick = () => {
		setUserActive(!userActive);
	};
	return (
		<>
			{isVisible && (
				<>
					<motion.nav
						className="MobileDashboard"
						key="mobileNav"
						variants={menuVisibility}
						initial="hidden"
						animate="visible"
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
										{userActive && (
											<UserDropdown mobile={true} logout={logout} />
										)}
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
					<motion.div
						className="overlay"
						variants={overlayVisibility}
						initial="hidden"
						animate="visible"
						exit="exit"></motion.div>
				</>
			)}
		</>
	);
};

export default MobileDashboard;
