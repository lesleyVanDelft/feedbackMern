import { useState } from 'react';
import './Dashboard.css';
import FilterButtons from './FilterButtons/FilterButtons';
import Roadmap from './Roadmap/Roadmap';
const Dashboard = ({ category }) => {
	const [categoryState, setCategoryState] = useState('all');
	const getCategoryState = catState => {
		setCategoryState(catState);
		category(categoryState);
	};

	return (
		<section className="Dashboard">
			<div className="Dashboard__logo">
				<h2>Frontend Mentor</h2>
				<p>Feedback Board</p>
			</div>
			<FilterButtons category={getCategoryState} />
			<Roadmap />
		</section>
	);
};

export default Dashboard;
