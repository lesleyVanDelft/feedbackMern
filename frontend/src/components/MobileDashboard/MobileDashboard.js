import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import { logout, reset } from '../../features/auth/authSlice';

const menuVisibility = {
	hidden: { opacity: 0, right: -150 },
	visible: { opacity: 1, right: 0 },
	exit: { opacity: 0, right: -150 },
};

const MobileDashboard = ({ category, isVisible }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};
	return (
		<AnimatePresence exitBeforeEnter>
			{isVisible && (
				<motion.nav
					className="MobileDashboard"
					variants={menuVisibility}
					initial="hidden"
					animate={isVisible ? 'visible' : 'hidden'}
					exit="exit">
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
