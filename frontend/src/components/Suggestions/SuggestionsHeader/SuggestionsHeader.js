import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import BackBtn from '../../Buttons/BackBtn/BackBtn';
import SuggestionSortBy from '../SuggestionSortBy/SuggestionSortBy';
import './SuggestionsHeader.css';

const SuggestionsHeader = ({ suggestionCount, sortBy, roadmap }) => {
	const [headerSortState, setHeaderSortState] = useState('');

	const getHeaderSort = getSort => {
		setHeaderSortState(getSort);
		sortBy(headerSortState);
	};

	return roadmap === false ? (
		<header className="SuggestionsHeader">
			<div className="SuggestionsHeader__total">
				<HiOutlineLightBulb />
				<h2>
					<span className="suggestionCount">{suggestionCount}</span>Suggestions
				</h2>
			</div>
			<SuggestionSortBy getSortState={getHeaderSort} />

			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</header>
	) : (
		<header className="SuggestionsHeader">
			<div className="Roadmap__header">
				<BackBtn currentPage="roadmap" />
				<h3>Roadmap</h3>
			</div>
			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</header>
	);
};

export default SuggestionsHeader;
