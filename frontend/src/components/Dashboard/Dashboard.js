import { useEffect, useRef, useState } from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import MobileDashboard from '../MobileDashboard/MobileDashboard';
import FilterButtons from './FilterButtons/FilterButtons';
import Roadmap from './Roadmap/Roadmap';
import BlankProfileImg from '../../assets/blank-profile-picture.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, setUser } from '../../reducers/userReducer';
import UserDropdown from './UserDropdown/UserDropdown';
import { handleOutsideClick } from '../../utils/handleOutsideClick';
import './Dashboard.css';
// import { handleOutsideClick } from '../../utils/handleOutsideClick';

const Dashboard = ({ category, mobileOpen }) => {
	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [userActive, setUserActive] = useState(false);
	const toggle = () => setUserActive(!userActive);
	const [categoryState, setCategoryState] = useState('all');
	const [active, setActive] = useState(false);
	// const [userImage, setUserImage] = useState()
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setUserActive)
	);

	// NPM React query, check if user is on mobile
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setUserActive)
	);
	// console.log(dropdownRef);
	useEffect(() => {
		// if (!user) {
		// 	return <h1>loading user</h1>;
		// }

		// lock body scrolling when mobile menu is open
		active
			? (document.body.style.overflowY = 'hidden')
			: (document.body.style.overflowY = 'scroll');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	// get state through onclick on category buttons
	const getCategoryState = catState => {
		setCategoryState(catState);
		category(categoryState);
	};

	const handleMobileClick = () => {
		setActive(!active);
		// mobileOpen(active);
	};

	// const handleUserClick = () => {
	// 	setUserActive();
	// };

	const handleLogout = () => {
		setActive(false);

		setTimeout(() => {
			dispatch(logoutUser());
			navigate('/login');
		}, 100);
	};

	// framer motion
	const framerList = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};
	const framerItem = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	};

	return (
		<section className="Dashboard">
			{/* desktop + tablet dashboard */}
			{isMobile || (
				<motion.div
					variants={framerList}
					initial="hidden"
					animate="show"
					className="Dashboard__desktop">
					<motion.div variants={framerItem} className="Dashboard__logo">
						<div className="user" ref={dropdownRef}>
							<div className="user__actions" onClick={toggle}>
								{/* Welcome, */}
								{/* <img
									src={
										user.profileImg.exists ? (
											`/images/${user.profileImg.imageId}`
										) : (
											BlankProfileImg
										)
									}
									alt=""
								/> */}
								{user && user.profileImg.exists ? (
									<img
										src={`/images/${user.profileImg.imageId}`}
										alt="user profile "
									/>
								) : (
									<img src={BlankProfileImg} alt="empty profile" />
								)}

								<span className={`username ${userActive && 'active'}`}>
									{user && user.username}
									<VscTriangleDown />
									<AnimatePresence>
										{userActive && <UserDropdown logout={handleLogout} />}
									</AnimatePresence>
								</span>
							</div>
							<div className="user__text">
								<h2>Frontend Mentor</h2>
								<p>Feedback Board</p>
							</div>
						</div>

						<div
							className="hamburger"
							onClick={() => {
								setActive(!active);
							}}></div>
					</motion.div>

					<motion.div variants={framerItem} className="Dashboard__buttons ">
						<FilterButtons category={getCategoryState} />
					</motion.div>
					<motion.div variants={framerItem} className="Dashboard__roadmap ">
						<Roadmap />
					</motion.div>
					<motion.button
						variants={framerItem}
						className="btn btn-darkBlue logout"
						onClick={handleLogout}>
						Logout
					</motion.button>
				</motion.div>
			)}

			{/* Mobile Nav + Dashboard  */}

			{isMobile && (
				<div
					className={`mobileNavigation Dashboard__mobile ${
						active ? 'active' : null
					}`}
					ref={dropdownRef}>
					<div className="Dashboard__mobile--navigation">
						<Link to="/">
							<div className="text">
								<h2>Frontend Mentor</h2>
								<p>Feedback Board</p>
							</div>
						</Link>
						<div
							className={`hamburger ${active ? 'active' : ''}`}
							onClick={() => {
								handleMobileClick();
							}}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>

					<AnimatePresence>
						{active && (
							<MobileDashboard
								category={getCategoryState}
								isVisible={active}
								logout={handleLogout}
								menuRef={dropdownRef}
							/>
						)}
					</AnimatePresence>
				</div>
			)}
		</section>
	);
};

export default Dashboard;
