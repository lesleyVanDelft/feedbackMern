import './Dashboard.css';
import FilterButtons from './FilterButtons/FilterButtons';
import Roadmap from './Roadmap/Roadmap';
const Dashboard = () => {
	return (
		<section className="Dashboard">
			<div className="Dashboard__logo">
				<h2>Frontend Mentor</h2>
				<p>Feedback Board</p>
			</div>
			<FilterButtons />
			<Roadmap />
		</section>
	);
};

export default Dashboard;
