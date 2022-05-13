import { useEffect, useState } from 'react';
import { IoMenuSharp } from 'react-icons/io5/index.esm';
import { IoCloseSharp } from 'react-icons/io5/index.esm';
import { useMediaQuery } from 'react-responsive';
import { motion, LayoutGroup } from 'framer-motion';
import MobileDashboard from '../MobileDashboard/MobileDashboard';
import './Dashboard.css';
import FilterButtons from './FilterButtons/FilterButtons';
import Roadmap from './Roadmap/Roadmap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../reducers/userReducer';
const Dashboard = ({ category, mobileOpen }) => {
	const [categoryState, setCategoryState] = useState('all');
	const [active, setActive] = useState(false);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// lock body scrolling when mobile menu is open
	useEffect(() => {
		if (!user) {
			return <h1>loading user</h1>;
		}
		return active
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'unset');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	// get state through onclick on category buttons
	const getCategoryState = catState => {
		setCategoryState(catState);
		category(categoryState);
	};

	const handleMobileClick = () => {
		setActive(!active);
		mobileOpen(active);
	};
	const handleLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
	};

	// NPM React query, check if user is on mobile
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

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
	if (!user) {
	}

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
						<div className="text">
							<h3 className="text__user">
								Welcome,
								<span className="username"> @{user && user.username}</span>
							</h3>
							<div>
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

					{/* <motion.div variants={framerItem} className="Dashboard__user">
						<h3 className="userWelcome">
							Welcome, <span className="user">@{user.username}</span>
						</h3>
					</motion.div> */}

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
				<div className={`Dashboard__mobile ${active ? 'active' : null}`}>
					<div className="Dashboard__mobile--logo">
						<Link to="/">
							<div className="text">
								<h2>Frontend Mentor</h2>
								<p>Feedback Board</p>
							</div>
						</Link>
						<div
							className="hamburger"
							onClick={() => {
								handleMobileClick();
							}}>
							{active ? <IoCloseSharp /> : <IoMenuSharp />}
						</div>
					</div>

					{active ? (
						<LayoutGroup>
							<MobileDashboard
								category={getCategoryState}
								isVisible={active}
								layout
							/>
						</LayoutGroup>
					) : null}
				</div>
			)}
		</section>
	);
};

export default Dashboard;
