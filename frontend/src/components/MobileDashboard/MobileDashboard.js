import { useSelector } from 'react-redux';
import { VscTriangleDown } from 'react-icons/vsc';
import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import UserDropdown from '../Dashboard/UserDropdown/UserDropdown';
import BlankProfileImg from '../../assets/blank-profile-picture.png';
import { handleOutsideClick } from '../../utils/handleOutsideClick';
import './MobileDashboard.css';

const menuVisibility = {
	hidden: { opacity: 0, right: -150 },
	visible: {
		opacity: 1,
		right: 0,
		transition: {
			duration: 0.3,
		},
	},
	exit: {
		opacity: 0,
		right: -350,
		transition: {
			duration: 0.2,
		},
	},
};
const overlayVisibility = {
	hidden: { opacity: 0, right: -150 },
	visible: {
		opacity: 0.5,
		right: 0,
		transition: {
			duration: '0.2',
		},
	},
	exit: {
		opacity: 0,
		right: -350,
		transition: {
			duration: '0.2',
		},
	},
};

const MobileDashboard = ({ category, isVisible, logout }) => {
	// Handle outside dropdown click
	const mobileDropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [userActive, setUserActive] = useState(false);
	const toggle = () => setUserActive(!userActive);
	// Logout modal state
	const [logoutModal, setLogoutModal] = useState(false);
	const user = useSelector(state => state.user);
	useEffect(
		handleOutsideClick(
			listening,
			setListening,
			mobileDropdownRef,
			setUserActive
		)
	);

	const openModal = e => {
		e.preventDefault();
		setLogoutModal(true);
	};
	const closeModal = e => {
		e.preventDefault();
		setLogoutModal(false);
	};

	const closeOnClick = act => {
		setUserActive(act);
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
						<div className="content">
							<div className="Dashboard__mobile--user user">
								<div
									className="userWelcome"
									ref={mobileDropdownRef}
									onClick={toggle}>
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
							<div className="Dashboard__mobile--filter">
								<h3>Filter by category</h3>
								<FilterButtons category={category} />
							</div>
							<div className="Dashboard__mobile--roadmap">
								<Roadmap />
							</div>
							<button className="btn btn-darkBlue" onClick={openModal}>
								Log Out
							</button>
							<Modal
								active={logoutModal}
								closeModal={closeModal}
								handleDelete={logout}
								isComment={true}
								isReply={false}
								param="logout"
							/>
						</div>
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
