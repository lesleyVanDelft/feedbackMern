import { useSelector } from 'react-redux';
import { VscTriangleDown } from 'react-icons/vsc';
import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState, useEffect } from 'react';
import UserDropdown from '../Dashboard/UserDropdown/UserDropdown';
import BlankProfileImg from '../../assets/blank-profile-picture.png';
import { handleOutsideClick } from '../../utils/handleOutsideClick';

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

const MobileDashboard = ({ category, isVisible, logout, menuRef }) => {
	// const [userActive, setUserActive] = useState(false);
	// const [userActive, eventHandlers] = useToggleOnFocus();
	const mobileDropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [userActive, setUserActive] = useState(false);
	const user = useSelector(state => state.user);
	const toggle = () => setUserActive(!userActive);
	useEffect(
		handleOutsideClick(
			listening,
			setListening,
			mobileDropdownRef,
			setUserActive
		)
	);

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
						<div className="Dashboard__mobile--user user">
							<div
								className="userWelcome"
								ref={mobileDropdownRef}
								onClick={toggle}>
								{/* Hi there, */}
								{user && user.profileImg.exists ? (
									<img
										src={`/images/${user.profileImg.imageId}`}
										alt="user profile "
									/>
								) : (
									<img src={BlankProfileImg} alt="empty profile" />
								)}
								<span className={`user ${userActive && 'active'}`}>
									@{user && user.username}
									<VscTriangleDown />
									<AnimatePresence>
										{userActive && (
											<UserDropdown mobile={true} logout={logout} />
										)}
									</AnimatePresence>
								</span>
							</div>
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
