import './Roadmap.css';

const Roadmap = () => {
	return (
		<div className="Roadmap">
			<div className="Roadmap__title">
				<h2>Roadmap</h2>
				<a href="/">View</a>
			</div>
			<ul className="Roadmap__list">
				<li>
					Planned <span>0</span>
				</li>
				<li>
					In-Progress <span>0</span>
				</li>
				<li>
					Live <span>0</span>
				</li>
			</ul>
		</div>
	);
};

export default Roadmap;
