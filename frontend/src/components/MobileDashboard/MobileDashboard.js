import { useSelector } from 'react-redux';
import { VscTriangleDown } from 'react-icons/vsc';
import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
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

// const useToggleOnFocus = (initialState = false) => {
// 	const [active, toggle] = useState(initialState);

// 	const eventHandlers = useMemo(
// 		() => ({
// 			onFocus: () => toggle(true),
// 			onBlur: () => toggle(false),
// 		}),
// 		[]
// 	);

// 	return [active, eventHandlers];
// };

const MobileDashboard = ({ category, isVisible, logout }) => {
	const mobileDropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [userActive, setUserActive] = useState(false);
	const toggle = () => setUserActive(!userActive);
	// const [userActive, eventHandlers] = useToggleOnFocus();
	const user = useSelector(state => state.user);

	useEffect(
		handleOutsideClick(
			listening,
			setListening,
			mobileDropdownRef,
			setUserActive
		)
	);

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
							<div
								className="userWelcome"
								ref={mobileDropdownRef}
								onClick={toggle}

								// {...eventHandlers}
							>
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
