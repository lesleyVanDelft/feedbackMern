import './FilterButtons.css';

const FilterButtons = () => {
	const types = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature'];

	return (
		<div className="FilterButtons">
			{types.map(type => {
				return <button>{type}</button>;
			})}
		</div>
	);
};

export default FilterButtons;
