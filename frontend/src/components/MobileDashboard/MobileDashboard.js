import FilterButtons from '../Dashboard/FilterButtons/FilterButtons';
import Roadmap from '../Dashboard/Roadmap/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';

const menuVisibility = {
	visible: { opacity: 1, right: 0 },
	hidden: { opacity: 0, right: -150 },
};

const MobileDashboard = ({ category, isVisible }) => {
	return (
		<AnimatePresence exitBeforeEnter>
			{isVisible && (
				<motion.nav
					className="MobileDashboard"
					variants={menuVisibility}
					initial="hidden"
					animate={isVisible ? 'visible' : 'hidden'}>
					<FilterButtons category={category} />
					<Roadmap />
				</motion.nav>
			)}
		</AnimatePresence>
	);
};

export default MobileDashboard;
