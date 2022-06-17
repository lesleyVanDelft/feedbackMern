import { useEffect, useState } from 'react';
import './FilterButtons.css';

const FilterButtons = ({ category, handleClose }) => {
	const types = ['all', 'ui', 'ux', 'enhancement', 'bug', 'feature'];
	const [active, setActive] = useState('all');

	const handleClick = type => {
		// setActive(type);
		// category(active);
		handleClose(active);
	};

	useEffect(() => {
		category(active);
	}, [category, active]);

	return (
		<div className="FilterButtons">
			{types.map((type, i) => {
				return (
					<button
						key={i}
						onClick={() => setActive(type)}
						className={`FilterButtons__button ${
							active === type ? 'active' : null
						}`}>
						{type}
					</button>
				);
			})}
		</div>
	);
};

export default FilterButtons;
