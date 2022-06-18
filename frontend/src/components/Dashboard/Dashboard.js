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
	const rootElement = document.getElementById('root');
	// Outside click handling
	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const [userActive, setUserActive] = useState(false);
	const toggle = () => setUserActive(!userActive);

	// Filter category
	const [categoryState, setCategoryState] = useState('all');

	// Mobile menu state
	const [active, setActive] = useState(false);
	// const [userImage, setUserImage] = useState()
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		// if (!user) {
		// 	return <h1>loading user</h1>;
		// }
		// switch (active) {
		// 	case true:
		// 		document.body.style.overflowY = 'hidden';
		// 		break;
		// 	case false:
		// 		document.body.style.removeProperty('overflow-y');
		// 		break;
		// 	default:
		// 		break;
		// }
		// lock body scrolling when mobile menu is open
		active
			? (document.body.style.overflowY = 'hidden ')
			: (document.body.style.overflowY = '');

		active &&
			document.addEventListener(
				'mousedown',
				e => e.which === (2 || 3) && e.preventDefault()
			);

		// active &&
		// 	document.addEventListener('mousedown', e => {
		// 		if (e.which === 2 || 3) {
		// 			// alert('middleclick');
		// 			return e.preventDefault();
		// 		}
		// 	});

		// if (active) {
		// 	document.addEventListener('touchstart' || 'mousedown', e => {
		// 		if (e.which === 2 || 3) {
		// 			// alert('middleclick');
		// 			return e.preventDefault();
		// 		}
		// 	});
		// } else {
		// 	document.addEventListener('mousedown', e => {
		// 		return e;
		// 	});
		// }

		// document.body.style.overflow = 'scroll';
		// if (active) {
		// 	document.body.style.overflowX = 'auto';
		// 	document.body.style.overflowY = 'hidden';
		// } else if(!active) {
		// 	document.body.style.overflowX = 'hidden';
		// 	document.body.style.overflowY = 'auto';
		// }
	}, [active]);
	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setUserActive)
	);

	// NPM React query, check if user is on mobile
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	// useEffect(
	// 	handleOutsideClick(listening, setListening, dropdownRef, setUserActive)
	// );
	// console.log(dropdownRef);

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
					className={`Dashboard__mobile ${active ? 'active' : ''}`}
					ref={dropdownRef}>
					<div className="Dashboard__mobile--navigation">
						<div className="content">
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
