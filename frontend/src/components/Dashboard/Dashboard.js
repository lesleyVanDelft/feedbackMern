import { useState } from 'react';
import { IoMenuSharp } from 'react-icons/io5/index.esm';
import { AiOutlineClose } from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import MobileDashboard from '../MobileDashboard/MobileDashboard';
import './Dashboard.css';
import FilterButtons from './FilterButtons/FilterButtons';
import Roadmap from './Roadmap/Roadmap';
const Dashboard = ({ category, mobileOpen }) => {
	const [categoryState, setCategoryState] = useState('all');
	const [active, setActive] = useState(false);

	// get state through onclick on category buttons
	const getCategoryState = catState => {
		setCategoryState(catState);
		category(categoryState);
	};

	const handleMobileClick = () => {
		setActive(!active);
		mobileOpen(active);
	};

	// NPM React query, check if user is on mobile
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	return (
		<section className="Dashboard">
			{isMobile || (
				<>
					<div className="Dashboard__logo">
						<div className="text">
							<h2>Frontend Mentor</h2>
							<p>Feedback Board</p>
						</div>

						<div
							className="hamburger"
							onClick={() => {
								setActive(!active);
							}}></div>
					</div>
					<div className="Dashboard__buttons ">
						<FilterButtons category={getCategoryState} />
					</div>
					<div className="Dashboard__roadmap ">
						<Roadmap />
					</div>
				</>
			)}

			{/* Mobile Nav + Dashboard  */}
			{isMobile && (
				<div className={`Dashboard__mobile ${active ? 'active' : null}`}>
					<div className="Dashboard__mobile--logo">
						<div className="text">
							<h2>Frontend Mentor</h2>
							<p>Feedback Board</p>
						</div>
						<div
							className="hamburger"
							onClick={() => {
								handleMobileClick();
							}}>
							{active ? <AiOutlineClose /> : <IoMenuSharp />}
						</div>
					</div>

					{active ? (
						<div>
							<MobileDashboard category={getCategoryState} isVisible={active} />
						</div>
					) : null}
				</div>
			)}
		</section>
	);
};

export default Dashboard;
