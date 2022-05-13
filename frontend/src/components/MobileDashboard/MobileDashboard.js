import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutUser } from '../../reducers/userReducer';

const menuVisibility = {
	hidden: { opacity: 0, right: -150 },
	visible: { opacity: 1, right: 0 },
	exit: { opacity: 0, right: -150 },
};

const MobileDashboard = ({ category, isVisible }) => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logoutUser());
		navigate('/login');
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
							Hi there, <span className="user">@{user.username}</span>
						</h3>
					</div>
					<FilterButtons category={category} />
					<Roadmap />
					<button className="btn btn-darkBlue" onClick={onLogout}>
						Log Out
					</button>
				</motion.nav>
			)}
		</AnimatePresence>
	);
};

export default MobileDashboard;
