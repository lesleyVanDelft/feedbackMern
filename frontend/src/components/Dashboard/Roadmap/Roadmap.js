import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Roadmap.css';

const Roadmap = () => {
	const feedbacks = useSelector(state => state.feedbacks);

	const plannedCount = feedbacks.filter(fb => fb.status === 'planned');
	const inProgressCount = feedbacks.filter(fb => fb.status === 'in-progress');
	const liveCount = feedbacks.filter(fb => fb.status === 'live');
	return (
		<div className="Roadmap">
			<div className="Roadmap__title">
				<h2>Roadmap</h2>
				<Link to="/roadmap">View</Link>
			</div>
			<ul className="Roadmap__list">
				<li>
					Planned <span>{plannedCount.length}</span>
				</li>
				<li>
					In-Progress <span>{inProgressCount.length}</span>
				</li>
				<li>
					Live <span>{liveCount.length}</span>
				</li>
			</ul>
		</div>
	);
};

export default Roadmap;
